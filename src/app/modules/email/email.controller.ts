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
  contactQueryAcknowledgementEmailHtml,
  newsletterSubscriptionEmailHtml,
} from "./email.template";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

// Use "onboarding@resend.dev" until you verify your own domain in Resend dashboard
const FROM = `BookMyStage <${process.env.RESEND_FROM_EMAIL_DOMAIN}>`;

const sendEmail = async (to: string, subject: string, html: string, attachments?: any[]) => {
  try {
    console.log(`sending email to ${to} from ${FROM}`);
    await resend.emails.send({ from: FROM, to, subject, html, attachments });
    console.log(`email sent to ${to} from ${FROM}`);
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

  const success = await sendEmail(buyerEmail, "Transaction Confirmation", `
    <h2>Thank you for your purchase, ${name}!</h2>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Payment ID:</strong> ${paymentId}</p>
    <p><strong>Total Amount:</strong> ₹${totalPrice}</p>
    <p><strong>Products Ordered:</strong></p>
    <ul>${productDetails}</ul>
    <p>We appreciate your business and hope you enjoy your purchase!</p>
  `);
  console.log(`Transaction email sent to ${buyerEmail}: ${success}`);
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
    "Welcome to Book My Stage — Your Child's Stage Awaits! 🎭",
    signupEmailHtml({ name, dashboardUrl: process.env.FRONTEND_URL + "/dashboard" })
  );
};

export const bookingConfirmationEmail = async (
  buyerEmail: string, name: string, productName: string,
  productDetail: string, eventDate: string, orderId: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    `Booking Confirmed! 🎉 ${name}'s Performance is Booked — Book My Stage`,
    bookingConfirmationEmailHtml({ name, eventName: productName, eventDetail: productDetail, eventDate, orderId, dashboardUrl })
  );
};

export const sendSubmissionEmail = async (
  buyerEmail: string, name: string, productName: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    `Video Received! 🎬 ${name}'s Performance is Now Under Evaluation — Book My Stage`,
    videoUploadedEmailHtml({ name, eventName: productName, dashboardUrl })
  );
};

export const sendReviewSubmissionEmail = async (
  buyerEmail: string, name: string, productName: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    `Review Received! ⭐ Thank you for your feedback on your recent performance — Book My Stage`,
    ratingRequestEmailHtml({ name, eventName: productName, ratingUrl: dashboardUrl })
  );
};

export const sendEvaluationDoneEmail = async (
  buyerEmail: string, name: string, productName: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    `🎓 ${name}'s Evaluation is Ready! Download Report & Certificate — Book My Stage`,
    evaluationDoneEmailHtml({ name, eventName: productName, feedbackUrl: dashboardUrl })
  );
};

export const sendCertificateReadyEmail = async (
  buyerEmail: string, name: string, productName: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    `🎓 ${name}'s Certificate is Ready! Download Now — Book My Stage`,
    certificateReadyEmailHtml({ name, eventName: productName, certificateUrl: dashboardUrl })
  );
};

export const sendprofileUpdatedEmail = async (
  buyerEmail: string, name: string, dashboardUrl: string
) => {
  await sendEmail(
    buyerEmail,
    "Profile Updated Successfully! 🎉 Your Book My Stage Profile Has Been Updated",
    profileUpdatedEmailHtml({ name, dashboardUrl })
  );
};

export const sendContactQueryAcknowledgementEmail = async (
  buyerEmail: string, name: string, email: string, mobile: string, message: string, submittedOn: string, websiteUrl: string
  ) => {
    await sendEmail(
      buyerEmail,
      "We've Received Your Query! 📬 Book My Stage Support Team Will Get Back to You Soon",
      contactQueryAcknowledgementEmailHtml({ name, email, mobile, message, submittedOn, websiteUrl })
    );
  };

export const sendNewsletterSubscriptionEmail = async (
  buyerEmail: string, exploreUrl: string
) => {
  await sendEmail(
    buyerEmail,
    "Welcome to the Book My Stage Newsletter! 🎉 Stay Tuned for the Latest Updates, Tips, and Exclusive Offers",
    newsletterSubscriptionEmailHtml({exploreUrl})
   );
};