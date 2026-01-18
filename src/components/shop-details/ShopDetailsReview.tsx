"use client";
import React, { useEffect, useState } from "react";
import AddReview from "./AddReview";
import axios from "axios";
import { UserReviewType } from "@/interFace/api-interFace";
import GetRatting from "@/hooks/GetRatting";
import Image from "next/image";
import userIcon from "../../../public/assets/img/icon/user-icon.png";
import Link from "next/link";
import useGlobalContext from "@/hooks/use-context";

const ShopDetailsReview = ({ product, newReview, setnewReview }: any) => {
  const [reviews, setReviews] = useState<UserReviewType[]>([]);
  const { user } = useGlobalContext();
  const [reviewuser, setReviewuser] = useState<string | null>(null); // Declare the state outside

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}user-input/reviews?id=${product?._id}`)
      .then((res) => {
        setReviews(res.data);
        // Check if the user has already reviewed
        const userReview = res.data.find(
          (item: UserReviewType) => item.email === user?.email
        );
        if (userReview) {
          setReviewuser(userReview.email);
        }
      })
      .catch((e) => console.log(e));
  }, [product?._id, newReview]);

  return (
    <>
      <div className="product_info-faq-area pt-50">
        <nav className="product-details-tab">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link
              className="nav-item nav-link active"
              id="nav-general-tab"
              data-bs-toggle="tab"
              href="#nav-general"
              role="tab"
              aria-selected="false"
            >
              Description
            </Link>
            <Link
              className="nav-item nav-link show"
              id="nav-seller-tab"
              data-bs-toggle="tab"
              href="#nav-seller"
              role="tab"
              aria-selected="true"
            >
              Reviews
            </Link>
          </div>
        </nav>
        <div
          className="tab-content product-details-content"
          id="nav-tabContent"
        >
          <div
            className="tab-pane fade active show"
            id="nav-general"
            role="tabpanel"
          >
            <div className="tabs-wrapper mt-35">
              <div className="product__details-des">
                {product?.productDetails
                  ?.split("\n")
                  .map((line: string, index: number) => {
                    const trimmed = line.trim();

                    const isSectionHeading =
                      trimmed === "What you get" ||
                      trimmed === "Evaluation Parameters" ||
                      trimmed === "Quick Rules";

                    const isTagline = index === 0 && trimmed.length > 0;

                    return (
                      <p
                        key={index}
                        className={`
      ${isSectionHeading || isTagline ? "fw-bold mt-3" : ""}
      mb-1
    `}
                      >
                        {line}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="tab-pane" id="nav-seller" role="tabpanel">
            <div
              className={`review-wrapper ${
                reviews.length > 4 ? "review-scroll" : ""
              }`}
            >
              {reviews.length ? (
                <div className="review-list">
                  {reviews.map((item) => (
                    <div key={item._id} className="review-card">
                      {/* Avatar */}
                      <div className="review-avatar">
                        <Image
                          src={item?.img ? item.img : userIcon}
                          alt="user"
                          width={56}
                          height={56}
                        />
                      </div>

                      {/* Review Content */}
                      <div className="review-content">
                        <div className="review-header">
                          <h5 className="review-user">{item.email}</h5>
                          <span className="review-date">{item.date}</span>
                        </div>

                        <div className="review-stars">
                          <GetRatting averageRating={item.retting} />
                        </div>

                        <p className="review-text">{item.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="review-empty">
                  <p>No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>

            {reviewuser !== user?.email && (
              <div className="review-form">
                <AddReview
                  setnewReview={setnewReview}
                  newReview={newReview}
                  product={product}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetailsReview;
