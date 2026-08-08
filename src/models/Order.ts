import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderDocument extends Document {
  user?: mongoose.Types.ObjectId;
  orderItems: Array<{
    name: string;
    quantity: number;
    image: string;
    price: number;
    size: string;
    product: mongoose.Types.ObjectId;
  }>;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: 'Razorpay' | 'Stripe' | 'COD';
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  orderStatus: 'Processing' | 'Dispatched' | 'In Transit' | 'Delivered' | 'Cancelled';
}

const OrderSchema = new Schema<IOrderDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  orderItems: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
  }],
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },
  paymentMethod: { type: String, required: true, enum: ['Razorpay', 'Stripe', 'COD'] },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true, default: 0.0 },
  shippingPrice: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date },
  orderStatus: { 
    type: String, 
    required: true, 
    enum: ['Processing', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled'],
    default: 'Processing' 
  }
}, {
  timestamps: true
});

const Order: Model<IOrderDocument> = mongoose.models.Order || mongoose.model<IOrderDocument>('Order', OrderSchema);
export default Order;