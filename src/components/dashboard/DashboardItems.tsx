"use client";
import useGlobalContext from "@/hooks/use-context";
import { SubmissionInfoType } from "@/interFace/interFace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { Star } from "lucide-react";
import moment from "moment";
import { ProductType, UserReviewType } from "@/interFace/api-interFace";
import { toast } from "react-toastify";
import VideoUpload from "./VideoUpload";

const styles = {
  container: {
    padding: "1rem",
    maxWidth: "80rem",
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap" as "wrap",
    gap: "0.5rem",
    marginBottom: "2rem",
  },
  eventButton: {
    padding: "0.5rem 1.5rem",
    borderRadius: "9999px",
    transition: "all 0.2s",
    cursor: "pointer",
    border: "1px solid #e5e7eb",
    backgroundColor: "white",
  },
  activeEventButton: {
    // backgroundColor: '#699C47',
    backgroundColor: "#19b3e2",
    color: "white",
    transform: "scale(1.05)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as "collapse",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    padding: "0.75rem 1rem",
    textAlign: "left" as const,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#111827",
  },
  tableCell: {
    padding: "0.75rem 1rem",
    borderTop: "1px solid #e5e7eb",
  },
  submitButton: {
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s",
  },
  submittedButton: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  activeSubmitButton: {
    backgroundColor: "#2563eb",
    color: "white",
  },
  starButton: {
    padding: "0.25rem",
    cursor: "pointer",
    transition: "transform 0.2s",
    background: "none",
    border: "none",
    position: "relative",
  },
  disabledStar: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  videoButton: {
    color: "#2563eb",
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#f3f4f6",
    },
  },
  criteriaContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  textarea: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    border: "1px solid #e5e7eb",
    resize: "none",
    fontFamily: "inherit",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  },
  disabledTextarea: {
    backgroundColor: "#f9fafb",
    cursor: "not-allowed",
  },
};

const StarRating = ({
  value,
  onChange,
  disabled = false,
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    starIndex: number
  ) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - rect.left < rect.width / 2;
      setHoverValue(starIndex - (isLeftHalf ? 0.5 : 0));
    }
  };

  const handleClick = (
    starIndex: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - rect.left < rect.width / 2;
      const clickedValue = starIndex - (isLeftHalf ? 0.5 : 0);
      onChange(clickedValue);
      setHoverValue(null);
    }
  };

  const renderStar = (starIndex: number) => {
    const displayValue = hoverValue !== null ? hoverValue : value;
    const isFullStar = displayValue >= starIndex;
    const isHalfStar = !isFullStar && displayValue >= starIndex - 0.5;

    return (
      <button
        key={starIndex}
        onClick={(e) => handleClick(starIndex, e)}
        onMouseMove={(e) => handleMouseMove(e, starIndex)}
        onMouseLeave={() => setHoverValue(null)}
        style={{
          ...styles.starButton,
          ...(disabled ? styles.disabledStar : {}),
          color: isFullStar || isHalfStar ? "#facc15" : "#d1d5db",
          position: "relative" as "relative",
        }}
      >
        <Star
          size={24}
          style={{
            fill: isFullStar ? "currentColor" : "none",
            stroke: "currentColor",
          }}
        />
        {isHalfStar && (
          <Star
            size={24}
            style={{
              position: "absolute",
              left: 0,
              fill: "currentColor",
              clipPath: "inset(0 50% 0 0)",
            }}
          />
        )}
      </button>
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map(renderStar)}
    </div>
  );
};

const DashboardItems = () => {
  const { user, header, myproducts } = useGlobalContext();
  const [submissionInfo, setSubmissionInfo] = useState<SubmissionInfoType[]>(
    []
  );
  const [ratings, setRatings] = useState<{ [key: string]: UserReviewType }>({});
  const [reviewSubmitted, setReviewSubmitted] = useState<
    Record<string, boolean>
  >({});
  const [updateReview, setupdateReview] = useState<boolean>(false);
  const [eventSubmission, setEventSubmission] =
    useState<SubmissionInfoType | null>(null);

  const [uploadedItems, setUploadedItems] = useState<Record<string, boolean>>(
    {}
  );

  const handleVideoSubmit = async (video: File) => {
    if (!eventSubmission || !user?.email) return;

    const formData = new FormData();
    formData.append("video", video);
    formData.append("eventName", eventSubmission.eventname);
    formData.append("email", user.email);
    formData.append("submissionId", String(eventSubmission.id));

    const res = await axios.post(
      `${process.env.BASE_URL}submission/video-upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.status === 200) {
      setUploadedItems((prev) => ({
        ...prev,
        [eventSubmission.id]: true,
      }));
      toast.success("Video uploaded successfully!");
    }
  };

  const disableUpload = (item: SubmissionInfoType) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(`${item.submissionDate}T23:59:59`); // end of the day
    deadline.setHours(23, 59, 59, 999);

    const case1 = today > deadline;
    const case2 = item.videoPath !== "";
    const case3 = uploadedItems[item.id] === true;

    return case1 || case2 || case3;
  };

  const handleFetchedData = (data: UserReviewType[]) => {
    const formattedData = data.reduce((acc, review) => {
      acc[review.productId] = review;
      return acc;
    }, {} as { [key: string]: UserReviewType });

    setRatings(formattedData);
  };

  const getPdfGenerator = async (
    evaluated: boolean,
    isReviewed: boolean,
    eventName: string,
    competitonName: string,
    date: string
  ) => {
    if (!evaluated) {
      toast.info(
        "Your performance is not evaluated yet. Certificate will be available after evaluation."
      );
      return;
    }

    if (!isReviewed) {
      toast.info("Please submit your review to download the certificate.");
      return;
    }
    const res = await axios.post(
      `${process.env.BASE_URL}pdf/generate-certificate`,
      {
        eventName: eventName,
        competititorName: competitonName,
        date: date,
      }
    );

    const pdfUrl = res.data.certificateUrl;

    // 1️⃣ Open PDF in new tab
    window.open(pdfUrl, "_blank");
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_URL}submission/list?email=${user?.email}`,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          const sorted = res.data.data.sort(
            (a: SubmissionInfoType, b: SubmissionInfoType) =>
              moment(b.submissionDate, "MM/DD/YY hh:mm a").valueOf() -
              moment(a.submissionDate, "MM/DD/YY hh:mm a").valueOf()
          );

          setSubmissionInfo(sorted);
        }
      });
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `${process.env.BASE_URL}user-input/client-review?email=${user?.email}`
        )
        .then((res) => {
          handleFetchedData(res.data);
        })
        .catch((e) => {});
    }
  }, [user?.email, updateReview]);

  const handleRatingChange = (contestantId: string, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [contestantId]: {
        ...prev[contestantId], // Preserve existing contestant data (if any)
        retting: value, // Update the rating
      },
    }));
  };
  const handleFeedbackChange = (contestantId: string, feedback: string) => {
    setRatings((prev) => ({
      ...prev,
      [contestantId]: {
        ...prev[contestantId], // Preserve existing contestant data (if any)
        review: feedback, // Update the rating
      },
    }));
  };

  const handleSubmitRating = async (
    eventid: string,
    eventname: string,
    eventEmail: string
  ) => {
    try {
      const rating = ratings[eventid];
      if (!rating) return;

      const reviewInfoData = {
        id: rating?._id,
        productId: eventid,
        productName: eventname,
        email: eventEmail,
        review: rating.review,
        retting: rating.retting,
        categoryName: "Events",
      };
      const response = await axios.put(
        `${process.env.BASE_URL}user-input/update-review?email=${eventEmail}`,
        reviewInfoData,
        header
      );

      if (response.data.message === "success") {
        toast.success("Review Updated");
        setReviewSubmitted((prev) => ({
          ...prev,
          [eventid]: true,
        }));
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        console.error("Unauthorized access");
      }
    }
  };

  const getSafeEmailKey = (email: string) => email.replace(/\./g, "_");

  const productById = useMemo(() => {
    const map = new Map<string, ProductType>();
    myproducts.forEach((p) => map.set(p._id, p));
    return map;
  }, [myproducts]);

  const hasUserReviewedProduct = (
    eventUserId: string,
    userEmail: string | undefined
  ): boolean => {
    if (!userEmail) return false;

    const product = productById.get(eventUserId);
    if (!product) return false;

    const safeKey = getSafeEmailKey(userEmail);

    const rettings = product.rettings;
    if (!rettings) return false;

    if (rettings instanceof Map) return rettings.has(safeKey);

    return Object.prototype.hasOwnProperty.call(
      rettings as unknown as Record<string, number>,
      safeKey
    );
  };

  return (
    <>
      {submissionInfo?.length ? (
        <>
          <div className="table-responsive">
            <section className="cart-area pt-10 pb-10">
              <div className="container small-container">
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="product-thumbnail">Images</th>
                            <th className="cart-product-name">Event</th>
                            <th className="product-quantity">
                              Last Date To Submission
                            </th>
                            <th className="product-quantity">Submit Video</th>
                            <th className="product-quantity">
                              Download Certificate
                            </th>
                            <th className="product-quantity">
                              Evaluation Report
                            </th>
                            <th className="product-quantity">Review</th>
                          </tr>
                        </thead>

                        <tbody>
                          {submissionInfo?.map((item) => {
                            const isReviewed =
                              reviewSubmitted[item.eventUserId] ||
                              hasUserReviewedProduct(
                                item.eventUserId,
                                user?.email
                              );

                            return (
                              <tr key={item.id}>
                                <td className="product-thumbnail">
                                  <Link
                                    href={`/shop-details/${item.eventUserId}`}
                                  >
                                    <Image
                                      src={item.eventimg}
                                      width={50}
                                      height={50}
                                      alt={item.eventname}
                                      style={{ width: "auto", height: "auto" }}
                                    />
                                  </Link>
                                </td>
                                <td className="product-name">
                                  <Link
                                    href={`/shop-details/${item.eventUserId}`}
                                  >
                                    {item.eventname}
                                    <span
                                      className="age-category-badge"
                                      style={{
                                        marginLeft: "8px",
                                        padding: "2px 8px",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#555",
                                        backgroundColor: "#f1f1f1",
                                        borderRadius: 12,
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {item.ageCategory}
                                    </span>
                                  </Link>
                                </td>
                                <td className="product-subtotal">
                                  <div className="bd-banner__btn">
                                    {item.submissionDate}
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  <div className="bd-banner__btn">
                                    <button
                                      className="bd-bn__btn-2"
                                      data-bs-toggle="modal"
                                      disabled={disableUpload(item)}
                                      data-bs-target="#uploadVideoModal"
                                      onClick={() => setEventSubmission(item)}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </td>

                                <td className="product-subtotal">
                                  <div className="bd-banner__btn">
                                    <button
                                      className="bd-bn__btn-2"
                                      onClick={() => {
                                        getPdfGenerator(
                                          item.evaluated,
                                          isReviewed,
                                          item.eventname,
                                          item.userEmail,
                                          item.submissionDate
                                        );
                                      }}
                                      style={{
                                        opacity:
                                          !item.evaluated || !isReviewed
                                            ? 0.5
                                            : 1,
                                        pointerEvents: "auto",
                                      }}
                                    >
                                      Download
                                    </button>
                                  </div>
                                </td>

                                <td className="product-subtotal">
                                  <div className="bd-banner__btn">
                                    <button
                                      className="bd-bn__btn-2"
                                      onClick={() => {
                                        console.log(item.feedbackReportPath);
                                      }}
                                      disabled={!item.evaluated}
                                    >
                                      Download
                                    </button>
                                  </div>
                                </td>

                                <td className="product-subtotal">
                                  <div className="bd-banner__btn">
                                    {/* <button className="bd-bn__btn-2">Review</button> */}
                                    <div style={styles.criteriaContainer}>
                                      <StarRating
                                        value={
                                          ratings[item.eventUserId]?.retting ||
                                          0
                                        }
                                        onChange={(value) =>
                                          handleRatingChange(
                                            item.eventUserId,
                                            value
                                          )
                                        }
                                        disabled={false}
                                      />
                                      <textarea
                                        value={
                                          ratings[item.eventUserId]?.review ||
                                          ""
                                        }
                                        onChange={(e) =>
                                          handleFeedbackChange(
                                            item.eventUserId,
                                            e.target.value
                                          )
                                        }
                                        placeholder="Reason input here..."
                                        rows={1}
                                        // outline="green"
                                        style={{
                                          ...styles.textarea,
                                          resize: "vertical",
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="bd-banner__btn mt-2">
                                    <button
                                      className="bd-bn__btn-2"
                                      onClick={() =>
                                        handleSubmitRating(
                                          item.eventUserId,
                                          item.eventname,
                                          item.userEmail
                                        )
                                      }
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* ⭐ MODAL FOR VIDEO UPLOAD */}
            <div
              className="modal fade"
              id="uploadVideoModal"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div
                  className="modal-content"
                  style={{
                    background: "transparent",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <VideoUpload onSubmit={handleVideoSubmit} />
                </div>
              </div>
            </div>
            <hr />
          </div>
        </>
      ) : (
        <p className="text-center">No Purchased events</p>
      )}
    </>
  );
};

export default DashboardItems;
