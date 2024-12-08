import { Layout } from "../../hoc/Layout";
import "./Cart.css";
import cartItem from "/assets/logo.jpg";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-wrapper">
        {/* Cart Items Section */}
        <div className="cart-item-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="cart-item">
                    <div
                      className="item-img img-wrapper"
                      style={{ backgroundImage: `url(${cartItem})` }}
                      role="img"
                      aria-label="Product image"
                    ></div>
                    <div className="cart-item-info">
                      <p className="product-category">Men's Collection</p>
                      <h3 className="product-title">
                        Fjallraven Foldsack No 1 Backpack Fits 15 Laptops
                      </h3>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="product-price">₹329.85</p>
                </td>
                <td>
                  <div className="product-control">
                    <button className="btn-quantity decrease-quantity">
                      -
                    </button>
                    <input
                      type="text"
                      value="2"
                      min="1"
                      className="quantity-input"
                      aria-label="Product quantity"
                      readOnly="true"
                    />
                    <button className="btn-quantity increase-quantity">
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <p className="product-total">₹659.70</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Checkout Section */}
        <div className="cart-checkout-container">
          <h2>
            Subtotal (1 item): <span className="subtotal-price">₹659.70</span>
          </h2>
          <div className="coupon-code">
            <div className="coupon-code-wrapper">
              <h3>Apply Coupon Code</h3>
              <p>Get more discount by using coupon code. if you have any ?</p>
              <input
                type="text"
                placeholder="Enter coupon code"
                className="coupon-input"
              />
              <button type="button" className="btn-apply-couponcode">
                Apply
              </button>
            </div>
          </div>
          <div className="cart-defails">
            <h3>Cart Total</h3>
            <p>Discount: ₹659.70</p>
            <p>Total: ₹659.70</p>
          </div>

          <div className="checkout-control">
            <button className="btn-checkout-control checkout-button">
              Place Order
            </button>
            <Link to="/" className="btn-checkout-control continue-shipping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout(Cart);
