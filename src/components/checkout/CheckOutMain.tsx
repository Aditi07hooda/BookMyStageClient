"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGlobalContext from "@/hooks/use-context";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clear_cart_after_payment } from "@/redux/slices/cartSlice";
import { log } from "console";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FormData {
  Fname: string;
  Lname: string;
  Address: string;
  City: string;
  Postcode: string;
  EmailAddress: string;
  Phone: string;
}

const CheckOutMain = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, header, setPaymentSuccess } = useGlobalContext();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );

  const totalPrice = cartProducts.reduce(
    (total, product) => total + (product.price ?? 0) * (product.totalCard ?? 0),
    0
  );
  const payment_description = cartProducts
    .map(
      (product) =>
        `${product.productName} (₹${product.price} x ${product.totalCard})`
    )
    .join(", ") + ` | Total Price: ₹${totalPrice}`;


  const handleGoToShopPage = () => {
    router.push("/shop");
  };

  useEffect(() => {
    // Dynamically load the Razorpay SDK
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error("Failed to load Razorpay SDK");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const paymentHandler = async (data: FormData) => {
    if (!razorpayLoaded) {
      console.error("Razorpay SDK is not loaded");
      return;
    }

    try {
      const response = await fetch(`${process.env.BASE_URL}payment/order`, {
        method: "POST",
        body: JSON.stringify({
          options: {
            amount: totalPrice * 100, // Convert to paise for Razorpay
            currency: "INR",
            receipt: `receipt_${Math.random().toString(36).substring(7)}`,
          },

        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your Razorpay Key ID
        amount: totalPrice * 100, // Amount in currency subunits
        currency: "INR",
        name: "Book My Stage",
        description: payment_description,
        order_id: order.id, // Razorpay order ID
        handler: async (response: any) => {
          const validateRes = await fetch(
            `${process.env.BASE_URL}payment/order/validate`,
            {
              method: "POST",
              body: JSON.stringify({
                response: response,
                user: {
                  buyerEmail: data.EmailAddress,
                  name: data.Fname+" "+data.Lname,
                  Address: data.Address,
                  City: data.City,
                  Postcode: data.Postcode,
                  EmailAddress: data.EmailAddress,
                  date,
                  Phone: data.Phone,
                  totalPrice,
                  orderProducts: cartProducts,
                  paymentId: "",
                  shipmentStatus: "pending",
                  shipmentStatusArray: [],
                }
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const jsonRes = await validateRes.json();
          if (jsonRes.msg = "success") {
            router.push("/profile");
            dispatch(clear_cart_after_payment());
            setPaymentSuccess(true);
            toast.success(`Payment Success`, {
              position: "top-left",
            });
          }

        },
        prefill: {
          name: data.Fname,
          email: data.EmailAddress,
          contact: data.Phone || 9999999999,
          address: data.Address,
        },
        notes: {
          address: data.Address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        alert(`Payment Failed: ${response.error.reason}`);
      });

      rzp1.open();
    } catch (error) {
      console.error("Payment initialization failed", error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    paymentHandler(data);
  };

  return (
    <>
      <section className="checkout-area pt-115 pb-100">
        <div className="container small-container">
          <div className="coupon-accordion">
            <h3>
              Hi, {user?.name} <span id="showlogin"> Welcome To Orgado </span>
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="row">
              <div className="col-lg-6">
                <div className="checkbox-form">
                  <h3>Billing To</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.email && user.name}
                          placeholder="Enter Your Name"
                          {...register("Fname", {
                            required: "Name is required",
                          })}
                        />
                        {errors.Fname && (
                          <span className="error-message">
                            {errors.Fname.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Email Address <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          defaultValue={user?.email && user.email}
                          readOnly
                          placeholder=""
                          {...register("EmailAddress", {
                            required: "Email is required",
                          })}
                        />
                        {errors.EmailAddress && (
                          <span className="error-message">
                            {errors.EmailAddress.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Phone <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.email && user.phone}
                          placeholder="Phone Number"
                          {...register("Phone", {
                            required: "Phone is required",
                          })}
                        />
                        {errors.Phone && (
                          <span className="error-message">
                            {errors.Phone.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* order info */}
              <div className="col-lg-6">
                <div className="your-order mb-30 ">
                  <h3>Your order</h3>
                  <div className="your-order-table table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          <th className="product-total">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts.map((item, index) => (
                          <tr className="cart_item" key={index}>
                            <td className="product-name">
                              {item.productName}{" "}
                              <strong className="product-quantity">
                                {" "}
                                × {item?.totalCard}
                              </strong>
                            </td>
                            <td className="product-total">
                              <span className="amount">
                                ₹{item?.totalCard * item.price}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Cart Subtotal</th>
                          <td>
                            <span className="amount">₹{totalPrice}</span>
                          </td>
                        </tr>
                        <tr className="order-total">
                          <th>Order Total</th>
                          <td>
                            <strong>
                              <span className="amount">₹{totalPrice}</span>
                            </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="order-button-payment mt-20">
                      {cartProducts.length ? (
                        <button
                          type="submit"
                          className="bd-fill__btn"
                          disabled={!razorpayLoaded}
                        >
                          Place Order
                        </button>
                      ) : (
                        <button onClick={handleGoToShopPage} className="bd-fill__btn">
                          Add Product For Checkout
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckOutMain;
