import nodemailer from "nodemailer";

/**
 * Nodemailer transporter — uses Gmail SMTP.
 * For production, consider services like SendGrid, Mailgun, or AWS SES.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send an OTP verification email.
 *
 * @param {string} to       – Recipient email address
 * @param {string} otp      – 6-digit OTP code
 * @param {string} purpose  – e.g. "Email Verification" or "Password Reset"
 */
export const sendOTPEmail = async (to, otp, purpose = "Email Verification") => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0; padding:0; background:#f4f4f7; font-family:'Segoe UI',Roboto,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7; padding:40px 0;">
        <tr>
          <td align="center">
            <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.06); overflow:hidden;">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6); padding:28px 32px; text-align:center;">
                  <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:700; letter-spacing:-0.5px;">
                    🏠 HostelOps
                  </h1>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:32px;">
                  <h2 style="margin:0 0 8px; color:#1f2937; font-size:20px;">${purpose}</h2>
                  <p style="margin:0 0 24px; color:#6b7280; font-size:15px; line-height:1.6;">
                    Use the verification code below to complete your request. This code is valid for <strong>10 minutes</strong>.
                  </p>
                  <!-- OTP Box -->
                  <div style="background:#f0f0ff; border:2px dashed #6366f1; border-radius:10px; padding:20px; text-align:center; margin-bottom:24px;">
                    <span style="font-size:36px; font-weight:800; letter-spacing:8px; color:#4f46e5;">
                      ${otp}
                    </span>
                  </div>
                  <p style="margin:0; color:#9ca3af; font-size:13px; line-height:1.5;">
                    If you didn't request this code, you can safely ignore this email. Someone else may have entered your email address by mistake.
                  </p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background:#f9fafb; padding:20px 32px; text-align:center; border-top:1px solid #e5e7eb;">
                  <p style="margin:0; color:#9ca3af; font-size:12px;">
                    © ${new Date().getFullYear()} HostelOps — Smart Hostel Management
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"HostelOps" <${process.env.EMAIL_USER}>`,
    to,
    subject: `${purpose} — Your OTP Code`,
    html,
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Send a generic email (for receipts, notifications, etc.)
 *
 * @param {Object} options
 * @param {string} options.to      – Recipient email
 * @param {string} options.subject – Email subject
 * @param {string} options.html    – HTML body
 * @param {Array}  [options.attachments] – Nodemailer attachments array
 */
export const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  const mailOptions = {
    from: `"HostelOps" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};
