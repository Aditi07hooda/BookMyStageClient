import React from "react";
import Modal from "react-bootstrap/Modal";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

function InfoToolTipModel({ show, onHide }: ModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal">
      
      <Modal.Body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            background: "#fff8e6",
            border: "1px solid #f5c26b",
            borderRadius: "10px",
            padding: "16px 20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            fontFamily: "sans-serif",
            lineHeight: "1.6",
          }}
        >
          <h3
            style={{
              margin: "0 0 12px 0",
              color: "#d97706",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ⭐ Star Rating Guide
          </h3>

          <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#444" }}>
            Use the following guide while assigning star ratings:
          </p>

          <ul
            style={{
              paddingLeft: "18px",
              margin: 0,
              fontSize: "14px",
              color: "#333",
            }}
          >
            <li>
              <strong>5.0 Stars – Outstanding:</strong> Exceptional performance
              with excellent skill, confidence, and presentation.
            </li>
            <li>
              <strong>4.5 Stars – Excellent:</strong> Very strong performance
              with minor areas for improvement.
            </li>
            <li>
              <strong>4.0 Stars – Very Good:</strong> Strong performance with
              good control and clarity.
            </li>
            <li>
              <strong>3.5 Stars – Good:</strong> Clear effort and ability shown,
              with noticeable improvement areas.
            </li>
            <li>
              <strong>3.0 Stars – Average:</strong> Acceptable performance
              showing basic understanding and execution.
            </li>
            <li>
              <strong>2.5 Stars – Below Average:</strong> Partial skill
              demonstration; needs significant improvement.
            </li>
            <li>
              <strong>2.0 Stars – Needs Improvement:</strong> Limited clarity or
              control; fundamentals need strengthening.
            </li>
            <li>
              <strong>1.5 Stars – Weak:</strong> Major gaps in execution and
              presentation.
            </li>
            <li>
              <strong>1.0 Star – Very Weak:</strong> Minimal skill
              demonstration.
            </li>
            <li>
              <strong>0.0 Star – Not Demonstrated:</strong> Parameter not
              demonstrated or not applicable.
            </li>
          </ul>

          <p
            style={{
              marginTop: "12px",
              fontSize: "13px",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            Half-star ratings may be used wherever appropriate.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InfoToolTipModel;
