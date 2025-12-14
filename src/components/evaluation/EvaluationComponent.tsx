"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Contestant,
  EventEvaluation,
  User,
} from "../evaluator/evaluator-interface";
import Image from "next/image";
import { Modal } from "react-bootstrap";

const EvaluationComponent: React.FC = () => {
  const router = useRouter();
  const [reviewedEvents, setReviewedEvents] = useState<Contestant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Contestant | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const openDetails = (event: Contestant) => setSelectedEvent(event);
  const closeDetails = () => setSelectedEvent(null);

  const openImagePreview = (img: string) => setPreviewImage(img);
  const closeImagePreview = () => setPreviewImage(null);

  const renderStars = (value: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < value ? "#FFD700" : "#D3D3D3" }}>
        ★
      </span>
    ));
  };

  const calculateAggregateRating = (evaluations: EventEvaluation[]) => {
    if (evaluations.length === 0) return 0;
    const totalScore = evaluations.reduce(
      (sum, evalItem) => sum + evalItem.score,
      0
    );
    return Math.round(totalScore / 5); // Assuming max score is 5
  };

  const getReviewedEvents = useCallback(async () => {
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
      const res = await axios.get(
        `${process.env.BASE_URL}evaluator/get-reviewed-events/${response.data.data.email}`
      );
      setReviewedEvents(res.data.data || []);
    } catch (error) {
      console.error("Error fetching reviewed events:", error);
      setError("Failed to fetch reviewed events.");
    }
  }, [router]);

  useEffect(() => {
    getReviewedEvents();
  }, [getReviewedEvents]);

  return (
    <>
      <div className="container py-4">
        <div className="d-flex justify-content-between">
          <h3
            className="fw-bold mb-3 position-relative pb-2 d-inline-block"
            style={{ color: "#19B3E2" }}
          >
            Reviewed Events
            <span
              className="position-absolute start-50 translate-middle-x bottom-0 rounded"
              style={{
                height: "4px",
                width: "70px",
                background: "linear-gradient(90deg, #007bff, #19B3E2)",
              }}
            ></span>
          </h3>

          <div className="bd-banner__btn" onClick={() => router.push("/evaluator")}>
            <button className="bd-bn__btn-2">Do Evaluation</button>
          </div>
        </div>

        {error && (
          <p className="text-danger fs-5 fw-semibold bg-danger-subtle p-3 rounded-4">
            {error}
          </p>
        )}

        {reviewedEvents.length === 0 ? (
          <div className="text-center text-secondary fs-5 py-5 bg-light rounded-4 shadow-sm">
            No events reviewed yet.
          </div>
        ) : (
          <div className="row g-4">
            {Array.isArray(reviewedEvents) &&
              reviewedEvents.map((event, index) => (
                <div key={index} className="w-auto h-auto text-center">
                  <div className="p-4 shadow rounded border bg-white">
                    {/* Image */}
                    <div
                      className="mt-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => openImagePreview(event.eventimg)}
                    >
                      <Image
                        src={event.eventimg}
                        alt="event-img"
                        width={200}
                        height={100}
                        className="rounded img-fluid text-center"
                      />
                    </div>

                    <h3 className="fs-5 fw-semibold mt-3">{event.eventname}</h3>

                    <div className="mt-3">
                      <p>
                        <strong>Contestant:</strong> {event.userEmail}
                      </p>
                      <p>
                        <strong>Submitted:</strong> {event.submissionDate}
                      </p>
                    </div>

                    {/* Aggregate Rating */}
                    <div className="mt-3 text-center">
                      <p className="fw-semibold">Aggregate Rating</p>
                      <div className="fs-3">
                        {renderStars(
                          calculateAggregateRating(event.evaluation)
                        )}
                      </div>
                    </div>

                    {/* Full Details Button */}
                    <button
                      className="mt-4 w-100 btn btn-primary"
                      onClick={() => openDetails(event)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* DETAILS MODAL */}
        <Modal show={!!selectedEvent} onHide={closeDetails} centered size="lg">
          {selectedEvent && (
            <div className="p-4">
              <h2 className="fw-bold fs-4 mb-3 text-center">
                {selectedEvent.eventname}
              </h2>
              <div className="d-flex justify-content-between gap-5">
                <Image
                  src={selectedEvent.eventimg}
                  alt="preview"
                  width={400}
                  height={250}
                  className="rounded img-fluid"
                />
                <div className="w-100">
                  <p>
                    <strong>Contestant Email:</strong> {selectedEvent.userEmail}
                  </p>
                  <p>
                    <strong>Submission Date:</strong>{" "}
                    {selectedEvent.submissionDate}
                  </p>

                  {/* Rating Breakdown */}
                  <div className="mt-4">
                    <h3 className="fw-semibold mb-2">Rating Breakdown</h3>
                    {selectedEvent.evaluation?.map((item, idx) => (
                      <div key={idx} className="mb-3">
                        <p className="text-capitalize fw-medium">
                          {item.criterion}
                        </p>

                        <div className="progress" style={{ height: "12px" }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: `${(item.score / 5) * 100}%` }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Score: ${item.score}`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* IMAGE PREVIEW MODAL */}
        <Modal
          show={!!previewImage}
          onHide={closeImagePreview}
          centered
          dialogClassName="custom-modal"
        >
          {previewImage && (
            <div className="p-2 text-center">
              <Image
                src={previewImage}
                alt="zoom"
                width={400}
                height={300}
                className="rounded img-fluid"
              />
              <style>{`
                .custom-modal {
                  max-width: fit-content !important;
                }
                .custom-modal .modal-content {
                  background-color: transparent;
                  box-shadow: none;
                  border: none;
                }
              `}</style>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default EvaluationComponent;
