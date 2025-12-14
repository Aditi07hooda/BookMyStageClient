export const signupEmailHtml = ({
  name,
  dashboardUrl,
}: {
  name: string;
  dashboardUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
    <h2 style="color:#0f766e;">Welcome to BookMyStage, ${name} 🎉</h2>
    <p>Thank you for signing up with <strong>BookMyStage</strong>!</p>
    <p>
      You can now explore events, participate in competitions, upload your performances 
      and track your progress – all from your dashboard.
    </p>
    <p>
      <a href="${dashboardUrl}" 
         style="display:inline-block; padding:10px 18px; background:#0f766e; color:#ffffff; 
                text-decoration:none; border-radius:4px; font-weight:bold;">
        Go to Dashboard
      </a>
    </p>
    <p>If this wasn’t you, please ignore this email.</p>
    <p style="margin-top:24px;">With love,<br/>Team BookMyStage 💚</p>
  </div>
`;

export const bookingConfirmationEmailHtml = ({
  name,
  eventName,
  eventDetail,
  eventDate,
  orderId,
  dashboardUrl,
}: {
  name: string;
  eventName: string;
  eventDetail: string;
  eventDate: string;
  orderId: string;
  dashboardUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
    <h2 style="color:#0f766e;">Booking Confirmed ✅</h2>
    <p>Hi ${name},</p>
    <p>Your booking for <strong>${eventName}</strong> is confirmed.</p>
    <p>
      <strong>Event:</strong> ${eventName}<br/>
      <strong>Detail:</strong> ${eventDetail}<br/>
      <strong>Date:</strong> ${eventDate}<br/>
      <strong>Booking ID:</strong> ${orderId}
    </p>
    <p>
      You can view this event and manage your submission from your dashboard.
    </p>
    <p>
      <a href="${dashboardUrl}" 
         style="display:inline-block; padding:10px 18px; background:#0f766e; color:#ffffff;
                text-decoration:none; border-radius:4px; font-weight:bold;">
        View My Events
      </a>
    </p>
    <p><strong>Rules and Regulations</strong></p>
    <p>
    Video Should be a minimum of 1 minute with this format and should follow deceny and should be performed by the registered user only found to be failing to follow they would be disqualified 
    Submission should be done before last date
    </p>
    <p style="margin-top:24px;">All the best for your performance! 🌟<br/>Team BookMyStage</p>
  </div>
`;

export const profileUpdatedEmailHtml = ({
  name,
  dashboardUrl,
}: {
  name: string;
  dashboardUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
    <h2 style="color:#0f766e;">Profile Updated ✏️</h2>
    <p>Hi ${name},</p>
    <p>
      This is a quick note to let you know that your 
      <strong>BookMyStage profile</strong> was recently updated from your dashboard.
    </p>
    <p>If this was you, no action is required.</p>
    <p>
      If you don’t recognize this change, we recommend reviewing your profile and 
      updating your password.
    </p>
    <p>
      <a href="${dashboardUrl}" 
         style="display:inline-block; padding:10px 18px; background:#0f766e; color:#ffffff;
                text-decoration:none; border-radius:4px; font-weight:bold;">
        Go to My Profile
      </a>
    </p>
    <p style="margin-top:24px;">Team BookMyStage</p>
  </div>
`;

export const videoUploadedEmailHtml = ({
  name,
  eventName,
  dashboardUrl,
} : {
  name: string;
  eventName: string;
  dashboardUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
    <h2 style="color:#0f766e;">Video Uploaded Successfully 🎥</h2>
    <p>Hi ${name},</p>
    <p>
      Your performance video for <strong>${eventName}</strong> has been uploaded successfully.
    </p>
    <p>
      Our team/judges will review your performance as per the event schedule.
      You can always check the status from your dashboard.
    </p>
    <p>
      <a href="${dashboardUrl}"
         style="display:inline-block; padding:10px 18px; background:#0f766e; color:#ffffff;
                text-decoration:none; border-radius:4px; font-weight:bold;">
        View My Submission
      </a>
    </p>
    <p style="margin-top:24px;">Break a leg! 🌟<br/>Team BookMyStage</p>
  </div>
`;

export const youtubeLiveEmailHtml = ({
  name,
  eventName,
  youtubeUrl,
}: {
  name: string;
  eventName: string;
  youtubeUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
    <h2 style="color:#0f766e;">Your Performance Is Live on YouTube ▶️</h2>
    <p>Hi ${name},</p>
    <p>
      Great news! Your performance for <strong>${eventName}</strong> is now 
      live on our official YouTube channel.
    </p>
    <p>
      You can watch it, share it with friends and family, and enjoy the applause!
    </p>
    <p>
      <a href="${youtubeUrl}"
         style="display:inline-block; padding:10px 18px; background:#ef4444; color:#ffffff;
                text-decoration:none; border-radius:4px; font-weight:bold;">
        Watch on YouTube
      </a>
    </p>
    <p style="margin-top:24px;">Keep shining ✨<br/>Team BookMyStage</p>
  </div>
`;

export const ratingRequestEmailHtml = ({
  name,
  eventName,
  ratingUrl,
}: {
  name: string;
  eventName: string;
  ratingUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
    <h2 style="color:#0f766e;">How Was Your Experience? ⭐</h2>
    <p>Hi ${name},</p>
    <p>
      Thank you for participating in <strong>${eventName}</strong> on BookMyStage.
    </p>
    <p>
      We’d love to hear your feedback. Your ratings & review help us improve 
      and also guide other participants.
    </p>
    <p>
      <a href="${ratingUrl}"
         style="display:inline-block; padding:10px 18px; background:#0f766e; color:#ffffff;
                text-decoration:none; border-radius:4px; font-weight:bold;">
        Give Rating & Review
      </a>
    </p>
    <p style="margin-top:24px;">Thank you for helping us grow 🙏<br/>Team BookMyStage</p>
  </div>
`;

export const evaluationDoneEmailHtml = ({
  name,
  eventName,
  feedbackUrl,
}: {
  name: string;
  eventName: string;
  feedbackUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
    <h2 style="color:#0f766e;">Your Evaluation Is Ready 📊</h2>
    <p>Hi ${name},</p>
    <p>
      The evaluation for your performance in <strong>${eventName}</strong> is now complete.
    </p>
    <p>
      You can download your detailed feedback report, including scores and comments from the judges.
    </p>
    <p>
      <a href="${feedbackUrl}"
         style="display:inline-block; padding:10px 18px; background:#0f766e; color:#ffffff;
                text-decoration:none; border-radius:4px; font-weight:bold;">
        Download Feedback Report
      </a>
    </p>
    <p style="margin-top:24px;">We hope this helps you grow even more 🌱<br/>Team BookMyStage</p>
  </div>
`;

export const certificateReadyEmailHtml = ({
  name,
  eventName,
  certificateUrl,
}: {
  name: string;
  eventName: string;
  certificateUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
    <h2 style="color:#0f766e;">Your Certificate Is Ready 🏆</h2>
    <p>Hi ${name},</p>
    <p>
      Congratulations! Your certificate for <strong>${eventName}</strong> 
      is now ready to download.
    </p>
    <p>
      You can download it using the button below and share it on your social media, 
      portfolio, or print it.
    </p>
    <p>
      <a href="${certificateUrl}"
         style="display:inline-block; padding:10px 18px; background:#0f766e; color:#ffffff;
                text-decoration:none; border-radius:4px; font-weight:bold;">
        Go to Dashboard and Download Certificate
      </a>
    </p>
    <p style="margin-top:24px;">Proud of your journey 🎖️<br/>Team BookMyStage</p>
  </div>
`;
