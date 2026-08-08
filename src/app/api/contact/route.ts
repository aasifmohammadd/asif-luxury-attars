import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, inquiryType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_SERVER_USER || 'asifpefumes@gmail.com';
    const emailPass = process.env.EMAIL_SERVER_PASSWORD;

    if (!emailPass) {
      return NextResponse.json(
        { error: 'Server configuration error: EMAIL_SERVER_PASSWORD is missing.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"House of ASIF" <${emailUser}>`,
      replyTo: email,
      to: 'aasifmohammadd@gmail.com', // Inquiries are delivered here
      subject: `New Contact Inquiry: ${inquiryType} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0b0b; color: #ffffff; padding: 20px; border-radius: 8px;">
          <h2 style="color: #d4af37; border-bottom: 1px solid #d4af37; padding-bottom: 8px;">
            House of ASIF - New Inquiry
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <hr style="border-color: #333;" />
          <p><strong>Message:</strong></p>
          <p style="background-color: #141414; padding: 12px; border-radius: 4px; white-space: pre-wrap; color: #dddddd;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully' });
  } catch (error: any) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send message via email' },
      { status: 500 }
    );
  }
}