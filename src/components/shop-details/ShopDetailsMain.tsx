"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FreeMode, Thumbs, Controller, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import axios from "axios";
import discover from "../../../public/assets/img/icon/discover.png";
import masterCard from "../../../public/assets/img/icon/mastercard.png";
import papyle from "../../../public/assets/img/icon/paypal.png";
import visa from "../../../public/assets/img/icon/visa.png";
import Image from "next/image";
import ShopDetailsReview from "./ShopDetailsReview";
import RelatedProduct from "./RelatedProduct";
import { CartProductType } from "@/interFace/interFace";
import { useDispatch } from "react-redux";
import { cart_product, decrease_quantity } from "@/redux/slices/cartSlice";
import GetRatting from "@/hooks/GetRatting";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { wishlist_product } from "@/redux/slices/wishlistSlice";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const ShopDetailsMain = ({ id }: any) => {
  const dispatch = useDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [newReview, setnewReview] = useState<boolean>(false);
  const [product, setProduct] = useState<CartProductType[]>([]);
  const [retting, setRetting] = useState<any>({});
  const [ageCategory, setAgeCategory] = useState<"Tiny Stars" | "Super Kids" | "Cool Champs" | "Teen Titans" | "">("");
  const myProduct: CartProductType = product[0];

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}product/single-products/${id}`)
      .then((res) => {
        setRetting(res.data.rettingsData);
        setProduct(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id, setnewReview, newReview, setRetting]);

  const handleAddToCart = (product: CartProductType) => {
    dispatch(cart_product(product));
  };

  const handDecressCart = (product: CartProductType) => {
    dispatch(decrease_quantity(product));
  };

  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );
  const quantity = cartProducts.find((item) => item?._id === myProduct?._id);
  const totalCart = quantity?.totalCard;

  const handleBookNow = () => {
    if (!ageCategory) {
      toast.error("Please select an age category");
      return;
    }

    if (myProduct) {
      const productWithCategory: CartProductType = {
        ...myProduct,
        ageCategory,
      };

      dispatch(cart_product(productWithCategory));
      window.location.href = "/cart";
    }
  };

  return (
    <>
      <Breadcrumb breadHome={"Home"} breadMenu={"Shop Details"} />

      <div className="bd__shop-details-area pt-115 pb-75">
        <div className="container small-container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="bd__shop-details-inner mb-55">
                <div className="row">
                  <div className="col-md-6">
                    <div className="product-details__thumb-inner small-device p-relative">
                      <div className="bd__shop-details-img-gallery mb-30">
                        <div className="product-details-active swiper-container">
                          <div className="swiper-wrappers">
                            <Swiper
                              thumbs={{ swiper: thumbsSwiper }}
                              loop={true}
                              spaceBetween={0}
                              slidesPerView={1}
                              freeMode={false}
                              watchSlidesProgress={true}
                              modules={[
                                Navigation,
                                Controller,
                                FreeMode,
                                Thumbs,
                              ]}
                              navigation={{
                                nextEl: ".product-details__button-next",
                                prevEl: ".product-details__button-prev",
                              }}
                            >
                              {myProduct &&
                                myProduct.productImages.map((item, index) => {
                                  return (
                                    <SwiperSlide key={index}>
                                      <div className="swiper-slides">
                                        <div className="bd-product__details-large-img w-img">
                                          <Image
                                            src={item}
                                            alt="product-details-img"
                                            width={577}
                                            height={577}
                                            style={{
                                              width: "100%",
                                              height: "auto",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </SwiperSlide>
                                  );
                                })}
                            </Swiper>
                          </div>
                        </div>
                      </div>
                      <div className="bd-product__details-small-img">
                        <div className="swiper-container product-details-nav">
                          <div className="swiper-wrappers">
                            <Swiper
                              onSwiper={(swiper) => setThumbsSwiper(swiper)}
                              loop={true}
                              spaceBetween={0}
                              slidesPerView={4}
                              modules={[Controller, FreeMode, Thumbs]}
                              watchSlidesProgress={false}
                            >
                              {myProduct &&
                                myProduct.productImages.map((item, index) => (
                                  <SwiperSlide key={index}>
                                    <div className="swiper-slides m-img">
                                      <div className="product-small__img">
                                        <Image
                                          src={item}
                                          alt="product-details-img"
                                          width={70}
                                          height={70}
                                          style={{
                                            width: "100%",
                                            height: "auto",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                ))}
                            </Swiper>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="modal-product-info shop-details-info">
                      <div className="product-ratting">
                        <ul>
                          <li>
                            <a href="#">
                              <GetRatting
                                averageRating={retting.averageRating}
                              />
                            </a>
                          </li>

                          <li className="review-total">
                            {" "}
                            <a href="#">
                              {" "}
                              ({" "}
                              {`${retting.rettings} ${
                                retting.rettings <= 1 ? "Rating" : "Ratings"
                              }`}{" "}
                              )
                            </a>
                          </li>
                        </ul>
                      </div>
                      <h3>{myProduct?.productName}</h3>
                      <div className="product-price">
                        <span>₹{myProduct?.price}.00</span>
                        <del>₹{myProduct?.oldPrice}.00</del>
                      </div>

                      <div className="modal-product-meta bd__product-details-menu-1">
                        <ul>
                          <li>
                            <h4>
                              Last Date For Submission:{" "}
                              {myProduct?.submissionDate}{" "}
                            </h4>
                          </li>
                        </ul>
                      </div>
                      <select
                        className="form-select mb-3"
                        value={ageCategory}
                        onChange={(e) => setAgeCategory(e.target.value as "Tiny Stars" | "Super Kids" | "Cool Champs" | "Teen Titans" | "")}
                      >
                        <option value="">Select Age Category</option>
                        <option value="Tiny Stars">
                          🌟 Tiny Stars (Playschool–UKG)
                        </option>
                        <option value="Super Kids">
                          🚀 Super Kids (Grades 1–4)
                        </option>
                        <option value="Cool Champs">
                          ⭐ Cool Champs (Grades 5–8)
                        </option>
                        <option value="Teen Titans">
                          🔥 Teen Titans (Grades 9–12)
                        </option>
                      </select>
                      <div className="product-quantity-cart mb-25">
                        <div className="product-quantity-form">
                          <form onSubmit={(e) => e.preventDefault()}>
                            <button
                              onClick={() => handDecressCart(myProduct)}
                              className="cart-minus"
                            >
                              <i className="far fa-minus"></i>
                            </button>
                            <input
                              className="cart-input"
                              type="text"
                              readOnly
                              value={totalCart ? totalCart : 0}
                            />
                            <button
                              className="cart-plus"
                              onClick={() => handleAddToCart(myProduct)}
                            >
                              <i className="far fa-plus"></i>
                            </button>
                          </form>
                        </div>
                        <span data-bs-dismiss="modal" aria-label="Close">
                          <button
                            className="cart-btn bd-fill__btn"
                            onClick={handleBookNow}
                          >
                            <i className="fal fa-shopping-bag"></i> Book Now
                          </button>
                        </span>{" "}
                      </div>

                      {myProduct?.subcategoryName ? (
                        <>
                          <div className="bd__product-details-menu-3">
                            <ul>
                              <li>
                                <span
                                  className="wishlist-btn"
                                  title="Wishlist"
                                  onClick={() =>
                                    dispatch(wishlist_product(myProduct))
                                  }
                                >
                                  <i className="far fa-heart"></i>
                                  <span>Add to Wishlist</span>
                                </span>
                              </li>
                              <li>
                                <span
                                  className="wishlist-btn cart-btn"
                                  title="Compare"
                                >
                                  <i className="fas fa-exchange-alt"></i>
                                  <span>Compare</span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      <div className="bd__social-media">
                        <ul>
                          <li>Share:</li>
                          <li>
                            <Link
                              href="https://www.facebook.com/"
                              target="_blank"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="https://twitter.com/?lang=en"
                              title="Twitter"
                            >
                              <i className="fab fa-twitter"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="https://www.linkedin.com/"
                              title="Linkedin"
                              target="_blank"
                            >
                              <i className="fab fa-linkedin"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="https://www.instagram.com/"
                              target="_blank"
                              title="Instagram"
                            >
                              <i className="fab fa-instagram"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="bd__safe-checkout">
                        <h5>Guaranteed Safe Checkout</h5>
                        <a href="#">
                          <Image src={discover} alt="Payment Image" />
                        </a>
                        <a href="#">
                          <Image src={masterCard} alt="Payment Image" />
                        </a>
                        <a href="#">
                          <Image src={papyle} alt="Payment Image" />
                        </a>
                        <a href="#">
                          <Image src={visa} alt="Payment Image" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ShopDetailsReview
                newReview={newReview}
                setnewReview={setnewReview}
                product={myProduct && myProduct}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bd-related-Product__area mb-95">
        <div className="small-container container">
          <RelatedProduct productID={id} category={myProduct?.categoryName} />
        </div>
      </div>
    </>
  );
};

export default ShopDetailsMain;
