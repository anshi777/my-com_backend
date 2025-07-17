import { model, Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // price per item at purchase time
  },
  { _id: false }
);

const shippingAddressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const paymentResultSchema = new Schema(
  {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,

    // Payment
    paymentMethod: { type: String, required: true },
    paymentResult: paymentResultSchema,
    paymentStatus: { type: String, default: "pending" },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },

    // Financials
    itemsTotal: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true }, // Final total = items + tax + shipping - discount
    currency: { type: String, default: "USD" },

    // Refund
    refundStatus: {
      type: String,
      enum: ["none", "requested", "refunded"],
      default: "none",
    },
    refundedAt: { type: Date },

    // Delivery
    deliveryStatus: { type: String, default: "processing" },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },

    // Admin / Tracking
    invoiceNumber: { type: String, unique: true },
  },
  { timestamps: true }
);

const OrderModel = model("Order", orderSchema);
export default OrderModel;
