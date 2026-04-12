import { Request, Response } from "express";
import { Resend } from "resend";
import {
  RepairRequest,
  DonationRequest,
  CustomizationRequest,
} from "./email.interface";
import {
  bookingConfirmationEmailHtml,
  certificateReadyEmailHtml,
  evaluationDoneEmailHtml,
  profileUpdatedEmailHtml,
  ratingRequestEmailHtml,
  signupEmailHtml,
  videoUploadedEmailHtml,
} from "./email.template";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

// Use "onboarding@resend.dev" until you verify your own domain in Resend dashboard
const FROM = `BookMyStage <${process.env.RESEND_FROM_EMAIL_DOMAIN}>`;

const sendEmail = async (to: string, subject: string, html: string, attachments?: any[]) => {
  try {
    await resend.emails.send({ from: FROM, to, subject, html, attachments });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const sendTransactionEmail = async (
  buyerEmail: string, name: string, orderId: string,
  paymentId: string, totalPrice: number, orderProducts: any[]
) => {
  const productDetails = orderProducts
    .map(p => `<li>${p.productName} - ${p.totalCard} items - ${p.price}</li>`)
    .join("");

  await sendEmail(buyerEmail, "Transaction Confirmation", `
    <h2>Thank you for your purchase, ${name}!</h2>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Payment ID:</strong> ${paymentId}</p>
    <p><strong>Total Amount:</strong> ₹${totalPrice}</p>
    <p><strong>Products Ordered:</strong></p>
    <ul>${productDetails}</ul>
    <p>We appreciate your business and hope you enjoy your purchase!</p>
  `);
};

export const sendFailedTransactionEmail = async (
  buyerEmail: string, name: string, totalPrice: number, orderProducts: any[]
) => {
  const productDetails = orderProducts
    .map(p => `<li>${p.productName} - ${p.totalCard} items - ${p.price}</li>`)
    .join("");

  await sendEmail(buyerEmail, "Transaction Failed", `
    <h2>Failed Purchase, Please try again, ${name}!</h2>
    <p><strong>Products trying to order:</strong></p>
    <ul>${productDetails}</ul>
    <p><strong>Total Amount:</strong> ₹${totalPrice}</p>
    <p>Please try again to complete your purchase.</p>
  `);
};

export const sendSignUpEmail = async (email: string, name: string) => {
  await sendEmail(
    email,
    "SignUp Confirmation",
    signupEmailHtml({ name, dashboardUrl: process.env.FRONTEND_URL + "/dashboard" })
  );
};

export const bookingConfirmationEmail = async (
  buyerEmail: string, name: string, productName: string,
  productDetail: string, eventDate: string, orderId: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    "Your Product Details & Submission Guidelines",
    bookingConfirmationEmailHtml({ name, eventName: productName, eventDetail: productDetail, eventDate, orderId, dashboardUrl })
  );
};

export const sendSubmissionEmail = async (
  buyerEmail: string, name: string, productName: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    "You Have Successfully Submitted",
    videoUploadedEmailHtml({ name, eventName: productName, dashboardUrl })
  );
};

export const sendReviewSubmissionEmail = async (
  buyerEmail: string, name: string, productName: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    "You Have Successfully Submitted the Review",
    ratingRequestEmailHtml({ name, eventName: productName, ratingUrl: dashboardUrl })
  );
};

export const sendEvaluationDoneEmail = async (
  buyerEmail: string, name: string, productName: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    "Evaluation Completed for Your Submission",
    evaluationDoneEmailHtml({ name, eventName: productName, feedbackUrl: dashboardUrl })
  );
};

export const sendCertificateReadyEmail = async (
  buyerEmail: string, name: string, productName: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    "Your Certificate is Ready",
    certificateReadyEmailHtml({ name, eventName: productName, certificateUrl: dashboardUrl })
  );
};

export const sendprofileUpdatedEmail = async (
  buyerEmail: string, name: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    "Your Profile has been Updated",
    profileUpdatedEmailHtml({ name, dashboardUrl })
  );
};
export const sendRepairRequest = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, body, to } = req.body as RepairRequest;
  const files = req.files as Express.Multer.File[];
  const attachments = files.map(f => ({ filename: f.originalname, path: f.path }));

  const sent = await sendEmail(to, "New Repair Request", `
    <h2>New Repair Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phoneNumber}</p>
    <p><strong>Description:</strong> ${body}</p>
  `, attachments);

  res.status(sent ? 200 : 500).json({ success: sent });
};

export const sendDonationRequest = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, numberOfToys, donationDetails, to } = req.body as DonationRequest;
  const files = req.files as Express.Multer.File[];
  const attachments = files.map(f => ({ filename: f.originalname, path: f.path }));

  const sent = await sendEmail(to, "New Donation Request", `
    <h2>New Donation Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phoneNumber}</p>
    <p><strong>Number of Toys:</strong> ${numberOfToys}</p>
    <p><strong>Details:</strong> ${donationDetails}</p>
  `, attachments);

  res.status(sent ? 200 : 500).json({ success: sent });
};

export const sendCustomizationRequest = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, customizationDetails, to } = req.body as CustomizationRequest;
  const files = req.files as Express.Multer.File[];
  const attachments = files.map(f => ({ filename: f.originalname, path: f.path }));

  const sent = await sendEmail(to, "New Customization Request", `
    <h2>New Customization Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phoneNumber}</p>
    <p><strong>Details:</strong> ${customizationDetails}</p>
  `, attachments);

  res.status(sent ? 200 : 500).json({ success: sent });
};