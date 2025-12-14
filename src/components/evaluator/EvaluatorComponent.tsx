"use client";

import React, { useState, useEffect, CSSProperties } from "react";
import axios from "axios";
import { Loader2, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MyVerticallyCenteredModal from "./popupmodel";
import {
  Contestant,
  User,
  Rating,
  CriteriaRating,
  ApiResponse,
} from "./evaluator-interface";
import { StarRating } from "./StarRatingComponent";
import NoVideoSubmitted from "../../../public/assets/img/event/NoVideoSubmitted.png";

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
  table: {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
};

const EvaluatorComponent: React.FC = () => {
  const router = useRouter();
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [ratings, setRatings] = useState<{ [key: string]: Rating }>({});
  const [events, setEvents] = useState<string[]>([]);
  const [evaluatorEmailId, setEvaluatorEmailId] = useState<string>("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [expandedContestant, setExpandedContestant] = useState<string | null>(
    null
  );

  useEffect(() => {
    const checkEvaluatorAccess = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/");
          return;
        }

        const response = await axios.post<User>(
          `${process.env.BASE_URL}user/get-user`,
          { token }
        );

        if (!response.data.data.evaluator) {
          router.push("/");
          return;
        }

        console.log("Evaluator info:", response.data.data);
        setEvaluatorEmailId(response.data.data.email || "");
        setEvents(response.data.data.eligibleEvents || []);
        setSelectedEvent(response.data.data.eligibleEvents[0] || "");
        setLoading(false);
      } catch (error) {
        console.error("Error checking evaluator access:", error);
        router.push("/");
      }
    };

    checkEvaluatorAccess();
  }, [router]);

  const criteria = [
    "Criteria-1",
    "Criteria-2",
    "Criteria-3",
    "Criteria-4",
    "Criteria-5",
  ];

  const calculateAverageRating = (criteriaRatings: {
    [key: string]: CriteriaRating;
  }): number => {
    const values = Object.values(criteriaRatings).map((cr) => cr.rating);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return Number((sum / values.length).toFixed(2));
  };

  const handleRatingChange = (
    contestantId: string,
    criteriaKey: string,
    value: number
  ) => {
    setRatings((prev) => ({
      ...prev,
      [contestantId]: {
        contestantId,
        criteria: {
          ...(prev[contestantId]?.criteria || {}),
          [criteriaKey]: {
            rating: value,
            feedback: prev[contestantId]?.criteria[criteriaKey]?.feedback || "",
          },
        },
      },
    }));
  };

  const handleFeedbackChange = (
    contestantId: string,
    criteriaKey: string,
    feedback: string
  ) => {
    setRatings((prev) => ({
      ...prev,
      [contestantId]: {
        contestantId,
        criteria: {
          ...(prev[contestantId]?.criteria || {}),
          [criteriaKey]: {
            rating: prev[contestantId]?.criteria[criteriaKey]?.rating || 0,
            feedback,
          },
        },
      },
    }));
  };

  const handleSubmitRating = async (contestantId: string) => {
    try {
      const rating = ratings[contestantId];
      if (!rating) return;

      const averageRating = calculateAverageRating(rating.criteria);

      const ratingWithAverage = {
        ...rating,
        averageRating,
        evaluatorEmailId: evaluatorEmailId,
      };
      console.log("Submitting rating data:", ratingWithAverage);

      const res = await axios.post(
        `${process.env.BASE_URL}submission/submit-evaluation`,
        ratingWithAverage
      );

      if (res.status !== 200) {
        console.error("Error submitting rating:", res.data.message);
        return;
      }

      setRatings((prev) => ({
        ...prev,
        [contestantId]: {
          ...prev[contestantId],
          submitted: true,
          averageRating: res.data.data.aggregateRating,
        },
      }));

      setContestants((val) => {
        return val.map((contestant) => {
          if (contestant.id === contestantId) {
            return {
              ...contestant,
              aggregateRating: res.data.data.aggregateRating,
            };
          }
          return contestant;
        });
      });

      setExpandedContestant(null);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleEventClick = async (eventName: string): Promise<void> => {
    setLoading(true);
    setSelectedEvent(eventName);
    setRatings({});

    try {
      const response = await axios.post<ApiResponse>(
        `${process.env.BASE_URL}user/all-contestants`,
        { eventName: eventName }
      );
      setContestants(response.data.contestants || []);
    } catch (error) {
      console.error("Error fetching contestants:", error);
      setContestants([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader2
          style={{
            height: "2rem",
            width: "2rem",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        {events.length > 0 ? (
          events?.map((event) => (
            <button
              key={event}
              onClick={() => handleEventClick(event)}
              style={{
                ...styles.eventButton,
                ...(selectedEvent === event ? styles.activeEventButton : {}),
              }}
            >
              {event}
            </button>
          ))
        ) : (
          <p style={{ color: "#4b5563" }}>
            You are not eligible for any events. Please register your
            eligibility.
          </p>
        )}
      </div>

      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
        >
          <Loader2
            style={{
              height: "2rem",
              width: "2rem",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      ) : selectedEvent && contestants.length > 0 ? (
        <div className="container mt-4">
          <div className="row g-3 g-lg-5 w-100 align-content-center">
            {contestants.filter(contestant => !contestant.evaluated).map((contestant, index) => {
              const isExpanded = expandedContestant === contestant.id; // local state

              return (
                <div className="col-md-6 col-lg-5" key={contestant.id}>
                  <div
                    className="card shadow-sm border-0 h-100"
                    style={{ borderRadius: "12px", overflow: "hidden" }}
                  >
                    {/* Video thumbnail */}
                    <div
                      className="position-relative"
                      style={{
                        cursor: "pointer",
                        height: "180px",
                        overflow: "hidden",
                      }}
                      onClick={() => {
                        setModalShow(true);
                        setSelectedVideo(contestant.videoPath);
                      }}
                    >
                      <Image
                        src={contestant.videoThumbnail || NoVideoSubmitted}
                        alt="Video Thumbnail"
                        className="card-img-top"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                      <span
                        className="position-absolute top-0 start-0 bg-dark text-white px-2 py-1 small"
                        style={{ borderBottomRightRadius: "8px" }}
                      >
                        #{index + 1}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="card-title mb-0 fw-bold text-primary">
                          {contestant.userEmail || `Contestant ${index + 1}`}
                        </h6>

                        {/* Dropdown toggle button */}
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            setExpandedContestant(
                              isExpanded ? null : contestant.id
                            )
                          }
                        >
                          {isExpanded ? "Hide" : "Evaluate"}
                        </button>
                      </div>

                      {/* Average Rating */}
                      {contestant.aggregateRating !== 0 && (
                        <p className="text-success mt-1 mb-2 small">
                          Average Rating:{" "}
                          {contestant.aggregateRating.toFixed(2)}
                        </p>
                      )}

                      {/* Collapsible Evaluation Form */}
                      {isExpanded && (
                        <div className="mt-3">
                          {criteria.map((criterion) => (
                            <div key={criterion} className="mb-3">
                              <label className="form-label fw-semibold small">
                                {criterion}
                              </label>
                              <div className="d-flex flex-column align-items-center">
                                <StarRating
                                  value={
                                    ratings[contestant.id]?.criteria[criterion]
                                      ?.rating ||
                                    contestant.evaluation[0].score ||
                                    0
                                  }
                                  onChange={(value) =>
                                    handleRatingChange(
                                      contestant.id,
                                      criterion,
                                      value
                                    )
                                  }
                                />
                                <textarea
                                  value={
                                    ratings[contestant.id]?.criteria[criterion]
                                      ?.feedback || ""
                                  }
                                  onChange={(e) =>
                                    handleFeedbackChange(
                                      contestant.id,
                                      criterion,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Reason input..."
                                  className="form-control mt-2"
                                  rows={2}
                                  style={{ fontSize: "0.9rem" }}
                                />
                              </div>
                            </div>
                          ))}

                          {/* Submit Button */}
                          <div className="text-end mt-2">
                            <button
                              onClick={() => handleSubmitRating(contestant.id)}
                              className="btn btn-primary btn-sm"
                              style={{
                                minWidth: "100px",
                                fontWeight: "500",
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <MyVerticallyCenteredModal
            show={modalShow}
            url={selectedVideo}
            onHide={() => setModalShow(false)}
          />
        </div>
      ) : (
        selectedEvent && (
          <div
            style={{ textAlign: "center", padding: "2rem", color: "#4b5563" }}
          >
            <p>No contestants found for {selectedEvent}</p>
          </div>
        )
      )}
    </div>
  );
};

export default EvaluatorComponent;
