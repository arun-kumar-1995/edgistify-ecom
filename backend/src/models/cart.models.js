import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceAtAddTime: {
    type: Date,
    required: true,
  },
});

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: [ProductSchema],
    totalItems: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  this.totalItems = this.products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  this.totalPrice = this.products.reduce(
    (sum, product) => sum + product.priceAtAddTime * product.quantity,
    0
  );
  next();
});

export const Cart = mongoose.model("Cart", schema);
