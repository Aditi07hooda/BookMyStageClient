import { Request, Response } from "express";
import nodemailer from "nodemailer";
import {
  RepairRequest,
  DonationRequest,
  CustomizationRequest,
} from "./email.interface";
import { bookingConfirmationEmailHtml, certificateReadyEmailHtml, evaluationDoneEmailHtml, profileUpdatedEmailHtml, ratingRequestEmailHtml, signupEmailHtml, videoUploadedEmailHtml } from "./email.template";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Secure SSL
  secure: true, // Use true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // App Password
  },
});

const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  attachments: any[]
) => {
  try {
    await transporter.sendMail({
      from: '"Fresh Toys" <noreply@freshtoys.com>',
      to,
      subject,
      html,
      attachments,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const sendRepairRequest = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, body, to } = req.body as RepairRequest;
  const files = req.files as Express.Multer.File[];

  const html = `
    <h2>New Repair Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
    <p><strong>Description:</strong> ${body}</p>
  `;

  const attachments = files.map((file) => ({
    filename: file.originalname,
    path: file.path,
  }));

  const emailSent = await sendEmail(
    to,
    "New Repair Request",
    html,
    attachments
  );

  if (emailSent) {
    res
      .status(200)
      .json({ success: true, message: "Repair request sent successfully" });
  } else {
    res
      .status(500)
      .json({ success: false, message: "Failed to send repair request" });
  }
};

export const sendDonationRequest = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, numberOfToys, donationDetails, to } =
    req.body as DonationRequest;
  const files = req.files as Express.Multer.File[];

  const html = `
    <h2>New Donation Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
    <p><strong>Number of Toys:</strong> ${numberOfToys}</p>
    <p><strong>Donation Details:</strong> ${donationDetails}</p>
  `;

  const attachments = files.map((file) => ({
    filename: file.originalname,
    path: file.path,
  }));

  const emailSent = await sendEmail(
    to,
    "New Donation Request",
    html,
    attachments
  );

  if (emailSent) {
    res
      .status(200)
      .json({ success: true, message: "Donation request sent successfully" });
  } else {
    res
      .status(500)
      .json({ success: false, message: "Failed to send donation request" });
  }
};

export const sendCustomizationRequest = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, customizationDetails, to } =
    req.body as CustomizationRequest;
  const files = req.files as Express.Multer.File[];

  const html = `
    <h2>New Customization Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
    <p><strong>Customization Details:</strong> ${customizationDetails}</p>
  `;

  const attachments = files.map((file) => ({
    filename: file.originalname,
    path: file.path,
  }));

  const emailSent = await sendEmail(
    to,
    "New Customization Request",
    html,
    attachments
  );

  if (emailSent) {
    res.status(200).json({
      success: true,
      message: "Customization request sent successfully",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to send customization request",
    });
  }
};

export const sendTransactionEmail = async (
  buyerEmail: string,
  name: string,
  orderId: string,
  paymentId: string,
  totalPrice: number,
  orderProducts: any[]
) => {
  try {
    let productDetails = orderProducts
      .map(
        (product) =>
          `<li>${product.productName} - ${product.totalCard} items - ${product.price}</li>`
      )
      .join("");

    const mailOptions = {
      from: `"BookMyStage" <${process.env.SMTP_USER}>`,
      to: buyerEmail,
      subject: "Transaction Confirmation",
      html: `
        <h2>Thank you for your purchase, ${name}!</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Payment ID:</strong> ${paymentId}</p>
        <p><strong>Total Amount:</strong> ₹${totalPrice}</p>
        <p><strong>Products Ordered:</strong></p>
        <ul>${productDetails}</ul>
        <p>We appreciate your business and hope you enjoy your purchase!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Transaction email sent successfully.");
  } catch (error) {
    console.error("Error sending transaction email:", error);
  }
};

export const sendSignUpEmail = async (email: string, name: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Secure SSL
      secure: true, // Use true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // App Password
      },
    });

    const mailOptions = {
      from: `"BookMyStage" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "SignUp Confirmation",
      html: signupEmailHtml({ name, dashboardUrl: process.env.FRONTEND_URL+"/dashboard" }),
    };
 
    await transporter.sendMail(mailOptions);
    console.log("Signup email sent successfully.");
  } catch (error) {
    console.error("Error sending signup email:", error);
  }
};

export const bookingConfirmationEmail = async (
  buyerEmail: string,
  name: string,
  productName: string,
  productDetail: string,
  eventDate: string,
  orderId: string,
  dashboardUrl: string
) => {
  try {
    const mailOptions = {
      from: `"BookMyStage" <${process.env.SMTP_USER}>`,
      to: buyerEmail,
      subject: "Your Product Details & Submission Guidelines",
      html: bookingConfirmationEmailHtml({
        name,
        eventName: productName,
        eventDetail: productDetail,
        eventDate,
        orderId,
        dashboardUrl,
      }),
    };

    await transporter.sendMail(mailOptions);
    console.log("after event submission email sent successfully.");
  } catch (error) {
    console.error("Error sending after event submission email:", error);
  }
}; 


export const sendSubmissionEmail = async (
  buyerEmail: string,
  name: string,
  productName: string,
  dashboardUrl: string
) => {
  try {
    const mailOptions = {
      from: `"BookMyStage" <${process.env.SMTP_USER}>`,
      to: buyerEmail,
      subject: "You Have SuccessFully Submitted The Submission",
      html: videoUploadedEmailHtml({ name, eventName: productName, dashboardUrl: dashboardUrl  }),
    };

    await transporter.sendMail(mailOptions);
    console.log("videoUploadedEmail email sent successfully.");
  } catch (error) {
    console.error("Error sending videoUploadedEmail email:", error);
  }
};

export const sendReviewSubmissionEmail = async (buyerEmail: string,
  name: string,
  productName: string,
  dashboardUrl: string) => {
    try {
    const mailOptions = {
      from: `"BookMyStage" <${process.env.SMTP_USER}>`,
      to: buyerEmail,
      subject: "You Have SuccessFully Submitted the Review",
      html: ratingRequestEmailHtml({ name, eventName: productName, ratingUrl: dashboardUrl  }),
    };

    await transporter.sendMail(mailOptions);
    console.log("videoUploadedEmail email sent successfully.");
  } catch (error) {
    console.error("Error sending videoUploadedEmail email:", error);
  }
}

export const sendEvaluationDoneEmail = async (buyerEmail: string,
  name: string,
  productName: string,
  dashboardUrl: string) => {
    try {
    const mailOptions = {
      from: `"BookMyStage" <${process.env.SMTP_USER}>`,
      to: buyerEmail,
      subject: "Evaluation Completed for Your Submission",
      html: evaluationDoneEmailHtml({ name, eventName: productName, feedbackUrl: dashboardUrl  }),
    };

    await transporter.sendMail(mailOptions);
    console.log("evaluationDoneEmailHtml email sent successfully.");
  } catch (error) {
    console.error("Error sending evaluationDoneEmail email:", error);
  }
}

export const sendCertificateReadyEmail = async(buyerEmail: string,
  name: string,
  productName: string,
  dashboardUrl: string) => {
    try {
    const mailOptions = {
      from: `"BookMyStage" <${process.env.SMTP_USER}>`,
      to: buyerEmail,
      subject: "Your Certificate is Ready",
      html: certificateReadyEmailHtml({ name, eventName: productName, certificateUrl: dashboardUrl  }),
    };

    await transporter.sendMail(mailOptions);
    console.log("certificateReadyEmail email sent successfully.");
  } catch (error) {
    console.error("Error sending certificateReadyEmail email:", error);
  }
}

export const sendprofileUpdatedEmail = async(buyerEmail: string,
  name: string,
  dashboardUrl: string) => {
    try {
    const mailOptions = {
      from: `"BookMyStage" <${process.env.SMTP_USER}>`,
      to: buyerEmail,
      subject: "Your Profile has been Updated",
      html: profileUpdatedEmailHtml({ name, dashboardUrl }),
    };

    await transporter.sendMail(mailOptions);
    console.log("profileUpdatedEmail email sent successfully.");
  } catch (error) {
    console.error("Error sending profileUpdatedEmail email:", error);
  }
}

// export const sendTestEmail = async (req: Request, res: Response) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465, // Secure SSL
//       secure: true, // Use true for 465
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS, // App Password
//       },
//     });

//     const mailOptions = {
//       from: `"BookMyStage" <${process.env.SMTP_USER}>`,
//       to: "sunilkpg23@gmail.com",
//       subject: "Transaction Confirmation",
//       html: `<h3>Hello Sunil,</h3><p>Your transaction was successful!</p>`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Transaction email sent successfully.");
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending transaction email:", error);
//     res.status(500).json({ error: "Email sending failed" });
//   }
// };
