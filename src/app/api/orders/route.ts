import { NextResponse } from 'next/server';
import { after } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/config/db';
import Order from '@/models/Order';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_SERVER_PORT) || 587,
  secure: false,
  pool: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER || 'asifpefumes@gmail.com',
    pass: process.env.EMAIL_PASS || process.env.EMAIL_SERVER_PASSWORD,
  },
});

const LOGISTICS_EMAIL = process.env.LOGISTICS_EMAIL || 'mohdasif.4857@gmail.com';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shippingAddress, paymentMethod, totalAmount, currency = '₹' } = body;

    // Generate Order ID instantly
    const orderId = `ASIF-${Math.floor(100000 + Math.random() * 900000)}`;

    // Build Email Items Table HTML
    const itemsTableRows = items
      .map(
        (item: any) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #222; color: #ffffff;">${item.name} (${item.size || '12 ML'})</td>
          <td style="padding: 10px; border-bottom: 1px solid #222; color: #D4AF37; text-align: center;">Qty: ${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #222; color: #ffffff; text-align: right;">${currency} ${item.price * item.quantity}</td>
        </tr>
      `
      )
      .join('');

    const customerEmailHtml = `
      <div style="background-color: #0B0B0B; color: #ffffff; font-family: Arial, sans-serif; padding: 30px; border-radius: 8px;">
        <h2 style="color: #D4AF37; text-align: center; margin-bottom: 5px;">ASIF PARFUMS DE LUXE</h2>
        <p style="text-align: center; color: #aaaaaa; font-size: 12px; letter-spacing: 2px;">ORDER CONFIRMATION</p>
        <hr style="border-color: #D4AF37; opacity: 0.3; margin: 20px 0;" />
        
        <p>Dear <strong>${shippingAddress.fullName}</strong>,</p>
        <p>Thank you for your acquisition. Your order <strong>#${orderId}</strong> has been successfully placed via <strong>${paymentMethod}</strong> and is currently being prepared for dispatch.</p>

        <h3 style="color: #D4AF37; margin-top: 25px;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #141414; color: #D4AF37;">
              <th style="padding: 10px; text-align: left;">Item</th>
              <th style="padding: 10px; text-align: center;">Quantity</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>${itemsTableRows}</tbody>
        </table>

        <div style="background-color: #141414; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <p style="margin: 0; color: #aaaaaa; font-size: 12px;">Grand Total: <strong style="color: #D4AF37; font-size: 16px;">${currency} ${totalAmount}</strong></p>
          <p style="margin: 5px 0 0 0; color: #aaaaaa; font-size: 12px;">Delivery Address: ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode || ''}, ${shippingAddress.country}</p>
        </div>

        <p style="font-size: 12px; color: #888888; text-align: center;">If you have any questions, contact our concierge at asifpefumes@gmail.com</p>
      </div>
    `;

    const logisticsEmailHtml = `
      <div style="background-color: #141414; color: #ffffff; font-family: Arial, sans-serif; padding: 25px; border-left: 4px solid #D4AF37;">
        <h2 style="color: #D4AF37; margin-top: 0;">NEW ORDER ACTION REQUIRED: #${orderId}</h2>
        <p><strong>Payment Method:</strong> <span style="color: #0B6E4F; font-weight: bold;">${paymentMethod}</span></p>
        <p><strong>Total Value:</strong> ${currency} ${totalAmount}</p>

        <h3>Customer Shipping Details</h3>
        <ul style="line-height: 1.6; color: #dddddd;">
          <li><strong>Name:</strong> ${shippingAddress.fullName}</li>
          <li><strong>Phone:</strong> ${shippingAddress.phone}</li>
          <li><strong>Email:</strong> ${shippingAddress.email}</li>
          <li><strong>Address:</strong> ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state || ''} - ${shippingAddress.postalCode || ''}, ${shippingAddress.country}</li>
        </ul>

        <h3>Items to Pack</h3>
        <table style="width: 100%; border-collapse: collapse; background: #0B0B0B;">
          <thead>
            <tr style="color: #D4AF37;">
              <th style="padding: 8px; text-align: left;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
            </tr>
          </thead>
          <tbody>${itemsTableRows}</tbody>
        </table>
      </div>
    `;

    // Execute database saving and email tasks AFTER responding to the user
    after(async () => {
      // 1. Save to MongoDB
      try {
        await dbConnect();
        await Order.create({
          orderItems: items,
          shippingAddress,
          paymentMethod,
          itemsPrice: totalAmount,
          totalPrice: totalAmount,
          isPaid: paymentMethod !== 'COD',
          orderStatus: 'Processing',
        });
      } catch (dbError) {
        console.error('Background DB Save Error:', dbError);
      }

      // 2. Dispatch Emails
      try {
        await Promise.all([
          // Customer confirmation sent to shippingAddress.email
          transporter.sendMail({
            from: `"ASIF Luxury Concierge" <${process.env.EMAIL_SERVER_USER || 'asifpefumes@gmail.com'}>`,
            to: shippingAddress.email,
            subject: `Order Confirmation #${orderId} - ASIF Parfums`,
            html: customerEmailHtml,
          }),
          // Logistics notification sent to mohdasif.4857@gmail.com
          transporter.sendMail({
            from: `"ASIF Order Bot" <${process.env.EMAIL_SERVER_USER || 'asifpefumes@gmail.com'}>`,
            to: LOGISTICS_EMAIL,
            subject: `[ACTION REQUIRED] New Order #${orderId} - ${shippingAddress.fullName}`,
            html: logisticsEmailHtml,
          }),
        ]);
      } catch (emailErr) {
        console.error('Background Email Dispatch Error:', emailErr);
      }
    });

    // Instant Response back to client browser
    return NextResponse.json({ success: true, orderId });
  } catch (error: any) {
    console.error('Order API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to process order' },
      { status: 500 }
    );
  }
}