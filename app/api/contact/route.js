import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // HTML email with inline CSS for color and professionalism
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h1 style="color: #3676f7; font-size: 24px; margin-bottom: 10px;">Thanks for Contacting Me!</h1>
        <p style="color: #333; font-size: 16px;">Hi ${name},</p>
        <p style="color: #333; font-size: 16px;">Thank you for reaching out! I’ll get back to you soon regarding your message:</p>
        <blockquote style="border-left: 4px solid #3676f7; padding-left: 10px; color: #555; font-style: Bold;">${message}</blockquote>
        <p style="color: #333; font-size: 16px;">Best regards,<br><span style="color: #3676f7; font-weight: bold;">Hargobind</span></p>
        <div style="margin-top: 20px; text-align: center;">
          <a href="https://your-portfolio.com" style="background-color: #3676f7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 14px;">Visit My Portfolio</a>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for Contacting Me!",
      text: `Hi ${name},\n\nThank you for reaching out! I’ll get back to you soon regarding your message:\n\n"${message}"\n\nBest,\nHargobind`, // Plain text fallback
      html: htmlContent, // Styled HTML version
    });

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}