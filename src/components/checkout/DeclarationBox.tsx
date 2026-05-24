import { useState } from "react";
import { Modal } from "react-bootstrap";

interface DeclarationBoxProps {
  onConsentChange: (consent: boolean) => void;
}

const DeclarationBox: React.FC<DeclarationBoxProps> = ({
  onConsentChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [show, setShow] = useState(false);
  const [hasOpenedDeclaration, setHasOpenedDeclaration] = useState(false);

  const shortText =
    "I have read and agree to the Consent & Declaration, Terms & Conditions, Privacy Policy, and Refund Policy.";

  const fullText = `
By proceeding with this booking, I confirm that I am either the parent/legal guardian of the participant, or I am the participant myself submitting this entry with full understanding and consent.

I understand that Book My Stage is a digital performance platform where students participate to receive expert evaluation, structured feedback, and a shareable, verifiable digital certificate. I agree that the evaluation process is structured and the outcomes are final.

I confirm that the submitted performance:
• Will be an individual performance by the registered participant
• Will follow the platform’s guidelines and standards
• Will not include inappropriate or restricted content

I understand and agree that as part of participating on the platform:
• The submitted performance (video/content) may be reviewed, processed, and presented on Book My Stage
• Selected or relevant performances may be showcased on the platform and its official channels (including YouTube and social media) for recognition and visibility
• The content may also be used for platform-related activities such as highlighting performances, promoting student talent, and creating learning examples

I understand that participation on the platform includes this visibility aspect as part of providing recognition and opportunities to students.

I also understand that:
• Each booking is valid for one performance evaluation
• Bookings are non-refundable except in cases of verified technical issues reported within the allowed time
• Submissions must be completed within the specified timeframe

I acknowledge that all personal details and submitted content (including videos and participant information) will be handled with care and stored securely. Book My Stage takes reasonable measures to protect user data and ensure privacy, and personal contact information will not be publicly displayed.

I understand that:
• Recognition, awards, or features are based on evaluation criteria
• The platform may update its policies from time to time

By continuing, I confirm that I have read and agree to the Terms & Conditions, Privacy Policy, and Refund Policy of Book My Stage.
`;

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.checked;
    setIsChecked(value);
    onConsentChange(value);
  };

  const handleOpenModal = () => {
    setShow(true);
    setHasOpenedDeclaration(true);
  };

  return (
    <>
      <div className="mt-4 p-4 border rounded-4 bg-white shadow-sm">
        <h5 className="mb-3 fw-bold">
          Consent & Declaration{" "}
          <span style={{ color: "#dc3545" }}>*</span>
        </h5>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="declarationConsent"
            checked={isChecked}
            onChange={handleCheckboxChange}
            disabled={!hasOpenedDeclaration}
          />

          <label
            className="form-check-label ms-2"
            htmlFor="declarationConsent"
            style={{
              lineHeight: "1.7",
              color: "#555",
              fontSize: "15px",
            }}
          >
            {shortText}{" "}
            <span
              onClick={(e) => {
                e.preventDefault();
                handleOpenModal();
              }}
              style={{
                color: "#0d6efd",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              Read Full Declaration
            </span>
          </label>
        </div>

        {!hasOpenedDeclaration && (
          <div
            className="mt-2"
            style={{
              fontSize: "13px",
              color: "#888",
            }}
          >
            Please open and review the declaration before continuing.
          </div>
        )}
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="xl"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontWeight: 700,
              fontSize: "24px",
            }}
          >
            Consent & Declaration
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            maxHeight: "75vh",
            overflowY: "auto",
            whiteSpace: "pre-line",
            lineHeight: "1.9",
            fontSize: "15px",
            color: "#444",
            padding: "24px",
          }}
        >
          {fullText}
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-primary px-4"
            onClick={() => setShow(false)}
          >
            I Understand
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeclarationBox;