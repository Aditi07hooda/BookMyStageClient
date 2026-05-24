import { Request, Response } from "express";
import NewsletterSubscriber from "./newsletter.modal";
import { sendNewsletterSubscriptionEmail } from "../email/email.controller";

export const subscribeNewsletter = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // check already subscribed
    const existingSubscriber = await NewsletterSubscriber.findOne({
      email,
    });

    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        message: "Email is already subscribed",
      });
    }

    // save subscriber
    const subscriber = await NewsletterSubscriber.create({
      email,
    });

    // send welcome email
    await sendNewsletterSubscriptionEmail(email, `${process.env.FRONTEND_URL}/performances`);

    return res.status(201).json({
      success: true,
      message: "Newsletter subscription successful",
      data: subscriber,
    });
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};