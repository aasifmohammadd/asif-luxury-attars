import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'INR' } = body;

    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // Check if real Razorpay keys are configured
    if (key_id && key_secret && !key_id.includes('mock') && !key_id.includes('your_key')) {
      const razorpay = new Razorpay({ key_id, key_secret });
      const options = {
        amount: Math.round(amount * 100), // Amount in paise
        currency,
        receipt: `asif_rcpt_${Date.now()}`,
      };

      const razorpayOrder = await razorpay.orders.create(options);

      return NextResponse.json({
        success: true,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      });
    }

    // Development Fallback: Generates a mock order ID so payment window opens cleanly in test environment
    const mockOrderId = `order_test_${Math.floor(100000 + Math.random() * 900000)}`;
    
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: Math.round(amount * 100),
      currency,
      isMock: true,
    });
  } catch (error: any) {
    console.error('Razorpay Order API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Payment initiation failed' },
      { status: 500 }
    );
  }
}