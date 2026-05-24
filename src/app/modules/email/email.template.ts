export const signupEmailHtml = ({
  name,
  dashboardUrl,
}: {
  name: string;
  dashboardUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #111827; max-width: 650px; margin: auto;">
    
    <h2 style="color:#0f766e;">
      Welcome to Book My Stage — Your Child's Stage Awaits! 🎭
    </h2>

    <p>Dear ${name},</p>

    <p>
      Welcome to <strong>Book My Stage</strong>! We are so glad you joined us.
    </p>

    <p>
      Book My Stage is India's dedicated online platform for school students to showcase their performing talent, receive structured evaluation, and build the confidence to shine — all from the comfort of home.
    </p>

    <h3 style="color:#0f766e;">Here is what your child can do on our platform:</h3>

    <ul>
      <li>
        Choose from 10 exciting performance categories — Dance, Singing, Theatre, Instrumental Music, Poetry, Storytelling, Public Speaking, Creative Costume, STEM Challenge, and Open Talent Showcase
      </li>
      <li>Perform from home — no stage fright, no travel</li>
      <li>
        Receive a Certified Structured Evaluation with detailed written feedback
      </li>
      <li>Download a Verifiable Digital Certificate</li>
      <li>
        Get recognised on our platform and social media channels
      </li>
    </ul>

    <h3 style="color:#0f766e;">Age Categories:</h3>

    <p>
      <strong>Tiny Stars (Age 4–8)</strong><br/>
      <strong>Super Kids (Age 8–12)</strong><br/>
      <strong>Cool Champs (Age 12–15)</strong><br/>
      <strong>Teen Titans (Age 15–18)</strong>
    </p>

    <p><strong>Ready to get started?</strong></p>

    <p>
      <a href="${dashboardUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e; color:#ffffff;
                text-decoration:none; border-radius:6px; font-weight:bold;">
        🎯 Browse Performances & Book Now — ₹199
      </a>
    </p>

    <p>
      If you have any questions, we are always here to help.
    </p>

    <p>
      Email us at 
      <a href="mailto:bookmystage.in@gmail.com">
        bookmystage.in@gmail.com
      </a>
    </p>

    <p>
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>

    <hr style="margin-top:30px;"/>

    <p style="font-size:14px; color:#6b7280;">
      Note: Every child deserves a stage — regardless of city, school, or background.
    </p>

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
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827; max-width:650px; margin:auto;">

    <h2 style="color:#0f766e;">
      Booking Confirmed! 🎉 Your Performance is Booked — Book My Stage
    </h2>

    <p>Dear ${name},</p>

    <p>
      Your booking is confirmed! Get ready — your child's moment in the spotlight is just around the corner.
    </p>

    <h3 style="color:#0f766e;">Booking Details:</h3>

    <table style="width:100%; border-collapse: collapse;">
      <tr>
        <td style="padding:8px 0;"><strong>Order ID:</strong></td>
        <td>${orderId}</td>
      </tr>

      <tr>
        <td style="padding:8px 0;"><strong>Performance:</strong></td>
        <td>${eventName}</td>
      </tr>

      <tr>
        <td style="padding:8px 0;"><strong>Performance Details:</strong></td>
        <td>${eventDetail}</td>
      </tr>

      <tr>
        <td style="padding:8px 0;"><strong>Booking Date:</strong></td>
        <td>${new Date().toLocaleDateString()}</td>
      </tr>

      <tr>
        <td style="padding:8px 0;"><strong>Last Date to Submit Video:</strong></td>
        <td>${eventDate}</td>
      </tr>
    </table>

    <h3 style="color:#0f766e;">What Happens Next?</h3>

    <ul>
      <li>You will receive detailed video submission instructions shortly</li>
      <li>Record your child's performance at home</li>
      <li>Upload the video from your dashboard before the submission deadline</li>
      <li>Our evaluation panel will review the performance</li>
      <li>
        Your child receives a detailed Evaluation Report and Digital Certificate
      </li>
    </ul>

    <p>
      <a href="${dashboardUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e; color:#ffffff;
                text-decoration:none; border-radius:6px; font-weight:bold;">
        📋 Go to My Dashboard
      </a>
    </p>

    <p>
      If you face any issues or have questions, please contact us at 
      <a href="mailto:bookmystage.in@gmail.com">
        bookmystage.in@gmail.com
      </a>.
    </p>

    <p>
      Thank you for choosing Book My Stage. We cannot wait to see your child perform!
    </p>

    <p>
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>

  </div>
`;

export const videoUploadedEmailHtml = ({
  name,
  eventName,
  dashboardUrl,
}: {
  name: string;
  eventName: string;
  dashboardUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      How to Submit Your Performance Video — Book My Stage 🎬
    </h2>

    <p>Dear ${name},</p>

    <p>
      Your child's performance submission window is now open! Here is everything
      you need to know to record and upload the perfect video.
    </p>

    <h3 style="color:#0f766e;">Video Recording Guidelines:</h3>

    <ul>
      <li>
        <strong>Orientation:</strong> Record in vertical (9:16) format for best results
      </li>
      <li>
        <strong>Duration:</strong> Maximum 3 minutes only
      </li>
      <li>
        <strong>Setup:</strong> Keep the camera stable with no shaking or zooming
      </li>
      <li>
        <strong>Participant:</strong> Only the registered child should appear in the video
      </li>
      <li>
        <strong>Format:</strong> Upload in MP4 format only
      </li>
      <li>
        <strong>Content:</strong> Keep the content appropriate and unedited
      </li>
      <li>
        <strong>Background:</strong> Use a clean, well-lit background
      </li>
    </ul>

    <h3 style="color:#0f766e;">How to Submit Your Video:</h3>

    <ol>
      <li>Log in to your Book My Stage account</li>
      <li>Go to My Dashboard</li>
      <li>Find your booked performance</li>
      <li>Click Submit Video and upload your MP4 file</li>
      <li>Wait for the upload confirmation message</li>
    </ol>

    <p style="margin:24px 0;">
      <a href="${dashboardUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        📤 Go to Dashboard & Upload Video
      </a>
    </p>

    <h3 style="color:#0f766e;">Tips for a Great Performance:</h3>

    <ul>
      <li>Let your child rehearse before recording</li>
      <li>Encourage confidence and enjoyment during the performance</li>
      <li>Ensure the audio is clear without background noise</li>
    </ul>

    <p>
      If you face any technical issues while uploading, contact us at
      <strong>bookmystage.in@gmail.com</strong>.
    </p>

    <p>
      We are cheering for your child! 🌟
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
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
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      🌟 Your Performance is Now LIVE on YouTube!
    </h2>

    <p>Dear ${name},</p>

    <p>
      Exciting news! Your performance for <strong>${eventName}</strong>
      has been featured on the Book My Stage YouTube channel and official
      social media pages.
    </p>

    <p>
      Your child is now performing for the whole world to see —
      what a proud moment!
    </p>

    <p>
      <strong>Watch Performance Here:</strong>
    </p>

    <p style="margin:24px 0;">
      <a href="${youtubeUrl}"
         style="display:inline-block; padding:12px 20px; background:#ef4444;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        ▶️ Watch Performance Now
      </a>
    </p>

    <h3 style="color:#0f766e;">Share the Joy:</h3>

    <ul>
      <li>Share the YouTube link with family and friends</li>
      <li>Like and comment on the video</li>
      <li>Tag us on social media: @BookMyStage</li>
      <li>Use hashtag: #BookMyStage</li>
    </ul>

    <p>
      Every view, like, and share means the world to your child.
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
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
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      🎓 Your Evaluation is Ready! Download Report & Certificate
    </h2>

    <p>Dear ${name},</p>

    <p>
      The wait is over! Your performance for
      <strong>${eventName}</strong> has been evaluated and the results are ready.
    </p>

    <p>
      Log in to your dashboard to read the detailed written feedback
      and download your documents.
    </p>

    <p style="margin:24px 0;">
      <a href="${feedbackUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        📄 Download Evaluation Report & Certificate
      </a>
    </p>

    <h3 style="color:#0f766e;">What You Can Do Now:</h3>

    <ul>
      <li>Download the detailed Evaluation Report</li>
      <li>Download the Verifiable Digital Certificate</li>
      <li>Share achievements on social media</li>
      <li>Use the feedback to improve future performances</li>
    </ul>

    <p>
      Congratulations on this wonderful achievement.
      Every performance is a step forward and we are proud of your child! 🌟
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
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
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      How was your experience with Book My Stage? 🌟
    </h2>

    <p>Dear ${name},</p>

    <p>
      We hope you enjoyed your experience with
      <strong>${eventName}</strong> on Book My Stage!
    </p>

    <p>
      Your opinion means everything to us and helps improve the platform
      for every child who performs with us.
    </p>

    <h3 style="color:#0f766e;">We would love to know:</h3>

    <ul>
      <li>How was the overall experience?</li>
      <li>Was the booking process smooth?</li>
      <li>Was the Evaluation Report meaningful?</li>
      <li>Would you recommend Book My Stage to others?</li>
    </ul>

    <p style="margin:24px 0;">
      <a href="${ratingUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        ⭐ Leave Your Rating & Review
      </a>
    </p>

    <p>
      Thank you for being part of the Book My Stage family.
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
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
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      🏅 Don't Forget to Share Your Certificate!
    </h2>

    <p>Dear ${name},</p>

    <p>
      You worked hard and performed beautifully —
      now it is time to celebrate and share your achievement!
    </p>

    <p style="margin:24px 0;">
      <a href="${certificateUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        📥 Download Certificate Again
      </a>
    </p>

    <h3 style="color:#0f766e;">Share Your Achievement:</h3>

    <ol>
      <li>Download your Digital Certificate</li>
      <li>Share it on WhatsApp, Instagram, or Facebook</li>
      <li>Tag us @BookMyStage and use #BookMyStage</li>
    </ol>

    <p>
      Every share inspires another child to take the stage.
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
  </div>
`;

export const videoSubmissionInstructionEmailHtml = ({
  parentName,
  childName,
  deadlineDate,
  dashboardUrl,
}: {
  parentName: string;
  childName: string;
  deadlineDate: string;
  dashboardUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      How to Submit ${childName}'s Performance Video — Book My Stage 🎬
    </h2>

    <p>Dear ${parentName},</p>

    <p>
      Your child's performance submission window is now open! Here is everything
      you need to know to record and upload the perfect video.
    </p>

    <p>
      <strong>Submission Deadline:</strong> ${deadlineDate}
    </p>

    <h3 style="color:#0f766e;">Video Recording Guidelines:</h3>

    <ul>
      <li>
        <strong>Orientation:</strong> Record in vertical (9:16) format for best results — simply hold your phone upright
      </li>
      <li>
        <strong>Duration:</strong> Maximum 3 minutes only
      </li>
      <li>
        <strong>Setup:</strong> Keep the camera stable — no movement, shaking, or zooming during the recording
      </li>
      <li>
        <strong>Participant:</strong> Only the registered child should appear in the video
      </li>
      <li>
        <strong>Format:</strong> Upload in MP4 format only
      </li>
      <li>
        <strong>Content:</strong> Keep the content appropriate and unedited
      </li>
      <li>
        <strong>Background:</strong> Choose a clean, well-lit background — natural light works best
      </li>
    </ul>

    <h3 style="color:#0f766e;">How to Submit Your Video:</h3>

    <ol>
      <li>Log in to your Book My Stage account</li>
      <li>Go to My Dashboard</li>
      <li>Find your booked performance</li>
      <li>Click Submit Video and upload your MP4 file</li>
      <li>Wait for the upload confirmation message</li>
    </ol>

    <p style="margin:24px 0;">
      <a href="${dashboardUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        📤 Go to Dashboard & Upload Video
      </a>
    </p>

    <h3 style="color:#0f766e;">Tips for a Great Performance:</h3>

    <ul>
      <li>Let your child rehearse once or twice before recording</li>
      <li>Encourage them to smile and enjoy — confidence shows on camera!</li>
      <li>Make sure the audio is clear and free from background noise</li>
    </ul>

    <p>
      If you face any technical issues while uploading, please contact us immediately
      at <strong>bookmystage.in@gmail.com</strong>.
    </p>

    <p>We are cheering for your child! 🌟</p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
  </div>
`;

export const submissionReminder7DaysEmailHtml = ({
  parentName,
  childName,
  deadlineDate,
  performanceName,
  ageCategory,
  dashboardUrl,
}: {
  parentName: string;
  childName: string;
  deadlineDate: string;
  performanceName: string;
  ageCategory: string;
  dashboardUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      ⏰ 7 Days Left! Submit ${childName}'s Performance — Book My Stage
    </h2>

    <p>Dear ${parentName},</p>

    <p>
      Just a friendly reminder — your child's video submission deadline is 7 days away!
    </p>

    <p>
      <strong>Submission Deadline:</strong> ${deadlineDate}<br/>
      <strong>Performance:</strong> ${performanceName}<br/>
      <strong>Age Category:</strong> ${ageCategory}
    </p>

    <p>
      If you have not yet recorded and uploaded your child's performance video,
      now is a great time to get started!
    </p>

    <p style="margin:24px 0;">
      <a href="${dashboardUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        📤 Submit Video Now — Go to Dashboard
      </a>
    </p>

    <h3 style="color:#0f766e;">Quick Reminder — Video Guidelines:</h3>

    <ul>
      <li>Vertical video (9:16), maximum 3 minutes, MP4 format</li>
      <li>Stable camera, good lighting, clear audio</li>
      <li>Only the registered participant should appear</li>
    </ul>

    <p>
      Need help? Contact us at <strong>bookmystage.in@gmail.com</strong>.
    </p>

    <p>Your child has worked hard — let the world see their talent! 🌟</p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
  </div>
`;

export const submissionReminder2DaysEmailHtml = ({
  parentName,
  childName,
  deadlineDate,
  performanceName,
  dashboardUrl,
}: {
  parentName: string;
  childName: string;
  deadlineDate: string;
  performanceName: string;
  dashboardUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#dc2626;">
      🚨 Only 2 Days Left! Don't Miss ${childName}'s Performance Deadline
    </h2>

    <p>Dear ${parentName},</p>

    <p>
      Your child's video submission deadline is just 2 days away.
      Please do not miss this chance!
    </p>

    <p>
      <strong>Submission Deadline:</strong> ${deadlineDate}<br/>
      <strong>Performance:</strong> ${performanceName}
    </p>

    <p>
      Videos not submitted before the deadline will not be eligible for
      evaluation, certification, or recognition.
    </p>

    <p style="margin:24px 0;">
      <a href="${dashboardUrl}"
         style="display:inline-block; padding:12px 20px; background:#dc2626;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        ⚡ Submit Your Video Right Now
      </a>
    </p>

    <h3 style="color:#0f766e;">It only takes a few minutes:</h3>

    <ol>
      <li>Record a 3-minute video on your phone (vertical, MP4)</li>
      <li>Log in to your dashboard</li>
      <li>Click Submit Video and upload</li>
      <li>Done! Your child is on stage.</li>
    </ol>

    <p>
      Facing any technical issues? Contact us immediately:<br/>
      Email: <strong>bookmystage.in@gmail.com</strong><br/>
      Support Hours: 8:30 AM – 9:30 PM
    </p>

    <p>
      Do not let this opportunity pass — your child's stage is waiting!
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
  </div>
`;

export const socialSharingNudgeEmailHtml = ({
  parentName,
  childName,
  performanceName,
  certificateUrl,
}: {
  parentName: string;
  childName: string;
  performanceName: string;
  certificateUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      Don't Forget to Share ${childName}'s Certificate! 🏅
    </h2>

    <p>Dear ${parentName},</p>

    <p>
      ${childName} worked hard and performed beautifully —
      now it is time to celebrate and share the achievement with the world!
    </p>

    <p style="margin:24px 0;">
      <a href="${certificateUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        📥 Download Certificate Again
      </a>
    </p>

    <h3 style="color:#0f766e;">
      Share ${childName}'s Achievement in 3 Easy Steps:
    </h3>

    <ol>
      <li>Download the Digital Certificate from your dashboard</li>
      <li>Share it on WhatsApp, Instagram, or Facebook</li>
      <li>Tag us @BookMyStage and use the hashtag #BookMyStage</li>
    </ol>

    <p>
      You can copy and use this ready-made post caption:
    </p>

    <div style="background:#f3f4f6; padding:16px; border-radius:8px;">
      <p style="margin:0;">
        "So proud of ${childName} who just performed ${performanceName}
        on Book My Stage — India's online performing arts platform for school students!
        Received a Certified Structured Evaluation and a Digital Certificate.
        #BookMyStage #ProudParent #MyChildShines"
      </p>
    </div>

    <p>
      Every share inspires another child to take the stage.
      Let us build a community of confident young performers together!
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
  </div>
`;

export const wishlistReminderEmailHtml = ({
  parentName,
  childName,
  performanceName,
  ageCategory,
  submissionDeadline,
  bookingUrl,
}: {
  parentName: string;
  childName: string;
  performanceName: string;
  ageCategory: string;
  submissionDeadline: string;
  bookingUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      Your child's favourited performance is waiting! ❤️
    </h2>

    <p>Dear ${parentName},</p>

    <p>
      We noticed that ${childName} has a performance wishlisted on
      Book My Stage — and we did not want you to miss out!
    </p>

    <h3 style="color:#0f766e;">Wishlisted Performance:</h3>

    <p>
      <strong>Performance:</strong> ${performanceName}<br/>
      <strong>Age Category:</strong> ${ageCategory}<br/>
      <strong>Price:</strong> ₹199<br/>
      <strong>Last Date to Submit:</strong> ${submissionDeadline}
    </p>

    <p>
      Spots are limited each season. Book now to make sure your child
      does not miss their chance to shine!
    </p>

    <p style="margin:24px 0;">
      <a href="${bookingUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        🎯 Book ${performanceName} Now — ₹199
      </a>
    </p>

    <h3 style="color:#0f766e;">What your child will receive:</h3>

    <ul>
      <li>Certified Structured Evaluation with 5-parameter feedback</li>
      <li>Detailed written Evaluation Report</li>
      <li>Verifiable Digital Certificate</li>
      <li>Recognition on Book My Stage platform and social media</li>
    </ul>

    <p>
      If you have any questions before booking, we are happy to help.<br/>
      Email: <strong>bookmystage.in@gmail.com</strong>
    </p>

    <p>
      Your child's stage is waiting — do not let this season pass by!
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
  </div>
`;

export const cartAbandonmentReminderEmailHtml = ({
  parentName,
  childName,
  performanceName,
  ageCategory,
  submissionDeadline,
  checkoutUrl,
}: {
  parentName: string;
  childName: string;
  performanceName: string;
  ageCategory: string;
  submissionDeadline: string;
  checkoutUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      You left something behind! 🛒 Complete ${childName}'s booking
    </h2>

    <p>Dear ${parentName},</p>

    <p>
      It looks like you were about to book a performance for ${childName}
      on Book My Stage but did not complete the payment.
      We saved your cart!
    </p>

    <h3 style="color:#0f766e;">Your Cart:</h3>

    <p>
      <strong>Performance:</strong> ${performanceName}<br/>
      <strong>Age Category:</strong> ${ageCategory}<br/>
      <strong>Price:</strong> ₹199
    </p>

    <p style="margin:24px 0;">
      <a href="${checkoutUrl}"
         style="display:inline-block; padding:12px 20px; background:#16a34a;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        ✅ Complete Your Booking Now — ₹199
      </a>
    </p>

    <h3 style="color:#0f766e;">Why complete your booking today?</h3>

    <ul>
      <li>Limited season slots — do not miss out</li>
      <li>Submission deadline: ${submissionDeadline}</li>
      <li>
        Your child gets a Certified Structured Evaluation,
        written feedback report, and Digital Certificate
      </li>
      <li>
        Safe and secure payment via Razorpay — UPI, Cards,
        Net Banking all accepted
      </li>
    </ul>

    <p>
      If you faced any issues during payment or have questions,
      we are here to help.<br/>
      Email: <strong>bookmystage.in@gmail.com</strong><br/>
      Support Hours: 8:30 AM – 9:30 PM
    </p>

    <p>
      Do not let ${childName}'s performance opportunity slip away —
      complete the booking in just 2 minutes!
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      www.bookmystage.in
    </p>
  </div>
`;

export const newsletterSubscriptionEmailHtml = ({
  exploreUrl,
}: {
  exploreUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      You're In! Welcome to the Book My Stage Newsletter 🎭
    </h2>

    <p>Hello,</p>

    <p>
      Thank you for subscribing to the Book My Stage Newsletter!
    </p>

    <p>
      You have just joined a growing community of parents and students
      who believe that every child deserves a stage.
    </p>

    <h3 style="color:#0f766e;">What to expect in our newsletter:</h3>

    <ul>
      <li>Season announcements and early access updates</li>
      <li>Early bird offers and special pricing</li>
      <li>Success stories from our community</li>
      <li>Tips for parents to help children build confidence</li>
      <li>Platform updates and new categories</li>
    </ul>

    <p>
      While you are here — explore our platform!
    </p>

    <p>
      Book My Stage is India's dedicated online performing arts platform
      for school students.
    </p>

    <p style="margin:24px 0;">
      <a href="${exploreUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        🎯 Explore Performances — Starting at ₹199
      </a>
    </p>

    <p>
      We promise to keep our emails meaningful, infrequent,
      and worth reading.
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Team</strong><br/>
      bookmystage.in@gmail.com | www.bookmystage.in
    </p>
  </div>
`;

export const contactQueryAcknowledgementEmailHtml = ({
  name,
  email,
  mobile,
  message,
  submittedOn,
  websiteUrl,
}: {
  name: string;
  email: string;
  mobile: string;
  message: string;
  submittedOn: string;
  websiteUrl: string;
}) => `
  <div style="font-family: Arial, sans-serif; line-height:1.8; color:#111827;">
    <h2 style="color:#0f766e;">
      We've Received Your Query 📩
    </h2>

    <p>Dear ${name},</p>

    <p>
      Thank you for reaching out to Book My Stage!
      We have received your message and our team
      will get back to you shortly.
    </p>

    <h3 style="color:#0f766e;">Your Query Details:</h3>

    <p>
      <strong>Name:</strong> ${name}<br/>
      <strong>Email:</strong> ${email}<br/>
      <strong>Mobile:</strong> ${mobile}<br/>
      <strong>Message:</strong> ${message}<br/>
      <strong>Submitted On:</strong> ${submittedOn}
    </p>

    <h3 style="color:#0f766e;">What happens next?</h3>

    <ul>
      <li>Our support team will review your query</li>
      <li>We usually respond within 24–48 working hours</li>
      <li>You will receive our response on this email address</li>
    </ul>

    <p>
      Need faster help?<br/>
      Email: <strong>bookmystage.in@gmail.com</strong><br/>
      Support Hours: 8:30 AM – 9:30 PM
    </p>

    <p style="margin:24px 0;">
      <a href="${websiteUrl}"
         style="display:inline-block; padding:12px 20px; background:#0f766e;
                color:#ffffff; text-decoration:none; border-radius:6px;
                font-weight:bold;">
        🌐 Visit Book My Stage
      </a>
    </p>

    <p>
      Thank you for your interest in Book My Stage.
      We look forward to helping you!
    </p>

    <p style="margin-top:24px;">
      Warm regards,<br/>
      <strong>The Book My Stage Support Team</strong><br/>
      bookmystage.in@gmail.com | www.bookmystage.in
    </p>
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

