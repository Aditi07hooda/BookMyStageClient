import { Request, Response } from "express";
require("dotenv").config();
const crypto = require("crypto");
const Razorpay = require("razorpay");
import { Order } from "../OrderProduct/orderSuccess.model";
import {
  bookingConfirmationEmail,
  sendFailedTransactionEmail,
  sendTransactionEmail,
} from "../email/email.controller"; // Import the email controller
import moment from "moment";
import { EventSubmission } from "../submission/submission.model"; // Import the new EventSubmission model

// Create Payment Intent function
export const CreatePaymentIntent = async (req: Request, res: Response) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body.options;

    if (!options?.amount) {
      return res.status(400).json({
        msg: "Amount is required",
      });
    }

    const order = await razorpay.orders.create({
      amount: options.amount,
      currency: options.currency || "INR",
      receipt: options.receipt || `receipt_${Date.now()}`,
    });

    return res.status(200).json(order);
  } catch (err: any) {
    console.error("Razorpay Order Error:", err);

    return res.status(500).json({
      msg: "Error creating Razorpay order",
      error: err.message,
    });
  }
};

// Payment Validation function
export const PaymentValidation = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.response;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        msg: "Missing payment verification fields",
      });
    }

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    // Extract order details from the request body
    const {
      buyerEmail,
      name,
      Address,
      City,
      Postcode,
      EmailAddress,
      Phone,
      totalPrice,
      orderProducts,
    } = req.body.user;

    const now = moment();
    const existingOrder = await Order.findOne({
      paymentId: razorpay_payment_id,
    });

    if (existingOrder) {
      return res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    }
    // Create the order document in MongoDB
    const newOrder = new Order({
      buyerEmail,
      name,
      Address,
      City,
      Postcode,
      EmailAddress,
      Phone,
      totalPrice,
      orderStatusDate: new Date().toISOString(),
      shipmentStatus: "Success", // Initial status
      orderProducts,
      date: now.format("MM/DD/YY hh:mm a"),
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

    // Save the new order in MongoDB
    const savedOrder = await newOrder.save();
    if (!savedOrder) {
      return res.status(500).json({ msg: "Error saving order" });
    }

    // Iterate over the products and create submissions in EventSubmission
    for (const product of orderProducts) {
      // Check if event submission already exists for the eventUserId to prevent duplicates
      for (let i = 0; i < product.totalCard; i++) {
        const existingSubmission = await EventSubmission.findOne({
          eventUserId: product._id,
          userEmail: EmailAddress,
        });

        if (!existingSubmission) {
          const newEventSubmission = new EventSubmission({
            ageCategory: product.ageCategory,
            eventUserId: product._id,
            userEmail: EmailAddress,
            eventimg: product.img,
            submissionDate: product.submissionDate,
            eventname: product.productName,
            videoPath: "",
            certificatePath: "",
            feedbackReportPath: "",
          });

          await newEventSubmission.save();
        }
      }
    }

    try {
      await sendTransactionEmail(
        buyerEmail,
        name,
        razorpay_order_id,
        razorpay_payment_id,
        totalPrice,
        orderProducts,
      );
      await Promise.all(
        orderProducts.map(async (element: any) => {
          await bookingConfirmationEmail(
            buyerEmail,
            name,
            element.productName,
            element.productDetails,
            element.submissionDate,
            newOrder._id.toString(),
            process.env.FRONTEND_URL + "/dashboard",
          );
        }),
      );
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      msg: "Payment validation failed",
    });
  }
};

export const PaymentFailure = async (req: Request, res: Response) => {
  try {
    const { buyerEmail, name, totalPrice, orderProducts } = req.body.user;

    await sendFailedTransactionEmail(
      buyerEmail,
      name,
      totalPrice,
      orderProducts,
    );

    return res.status(200).json({
      msg: "Failure email sent",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      msg: "Failed to process payment failure",
    });
  }
};
