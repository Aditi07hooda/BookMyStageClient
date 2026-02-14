import React from "react";

const sectionStyle: React.CSSProperties = {
  backgroundColor: "#f8f9ff",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "25px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
};

const TermsAndConditions: React.FC = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
        minHeight: "100vh",
        padding: "50px 15px",
      }}
    >
      <div className="container">
        <div
          className="mx-auto bg-white p-4 p-md-5"
          style={{
            maxWidth: "900px",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-5">
            <h1
              style={{
                fontWeight: 700,
                color: "#1e3a8a",
                marginBottom: "10px",
              }}
            >
              📜 Terms & Conditions
            </h1>
            <h5 className="fw-semibold text-secondary">
              Book My Stage – Digital Center for Performing Arts
            </h5>
            <p className="text-muted">Last updated: 21/01/2026</p>
          </div>

          {/* Section 1 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">1. Platform Overview</h5>
            <p>
              Book My Stage is a digital platform that enables school students
              (up to Grade 12) to participate in performance-based evaluations,
              receive expert feedback, certificates, and recognition.
            </p>
          </div>

          {/* Section 2 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">2. Eligibility</h5>
            <ul>
              <li>The platform is intended for school students up to Grade 12.</li>
              <li>All participants must submit performances individually.</li>
              <li>
                Registration and submission may be completed by the participant
                or by a parent/guardian.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              3. Parent / Guardian Declaration
            </h5>
            <p>
              By submitting a performance on Book My Stage, the submitter
              confirms that:
            </p>
            <ul>
              <li>
                They are the parent or legal guardian of the participant, or
              </li>
              <li>
                The submission is made with the knowledge and consent of the
                parent or legal guardian.
              </li>
            </ul>
            <p className="fw-semibold">
              This declaration is mandatory for participation.
            </p>
          </div>

          {/* Section 4 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              4. Performance Submission
            </h5>
            <ul>
              <li>
                Each performance entry requires a separate registration and
                submission.
              </li>
              <li>
                Only the registered participant must appear in the submitted
                video.
              </li>
              <li>
                Videos must follow the platform’s Video Submission Guidelines.
              </li>
              <li>
                Book My Stage reserves the right to reject or remove submissions
                that do not comply with guidelines or content standards.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              5. Evaluation & Certification
            </h5>
            <ul>
              <li>All performances are evaluated by expert jury members.</li>
              <li>
                Participants receive:
                <ul>
                  <li>A Detailed Evaluation Report</li>
                  <li>A Shareable & Verifiable Digital Certificate</li>
                </ul>
              </li>
              <li>
                Evaluation outcomes are final and not subject to dispute.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              6. Platform & Channel Recognition (Optional)
            </h5>
            <ul>
              <li>
                Participants may optionally consent to their performance being
                showcased on:
                <ul>
                  <li>The Book My Stage platform</li>
                  <li>Official channels such as YouTube or social media</li>
                </ul>
              </li>
              <li>
                Consent for such recognition is explicit, optional, and not
                mandatory.
              </li>
              <li>
                Declining this consent does not affect evaluation, certification,
                or awards.
              </li>
            </ul>
          </div>

          {/* Section 7 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              7. Awards & Recognition
            </h5>
            <ul>
              <li>
                Selected top performances may receive awards or trophies.
              </li>
              <li>
                Decisions regarding awards are at the sole discretion of Book My
                Stage and the evaluation framework.
              </li>
            </ul>
          </div>

          {/* Section 8 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              8. Refunds, Cancellations, and Modifications
            </h5>
            <p>
              All bookings on Book My Stage are for performance evaluation
              services. Once a performance is booked by making the payment, the
              booking is non-refundable.
            </p>
            <p>
              Refunds may be considered only in cases of verified technical
              failure from the Book My Stage platform. Any such request must be
              raised within 48 hours of booking by contacting the support team.
            </p>
            <p>
              Failure to submit the performance video within the specified
              submission window does not qualify for a refund.
            </p>
          </div>

          {/* Section 9 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">9. Content Standards</h5>
            <p>The following are strictly prohibited:</p>
            <ul>
              <li>Inappropriate, unsafe, or offensive content</li>
              <li>Dangerous activities or stunts</li>
              <li>Political, religious, or controversial themes</li>
              <li>Group performances</li>
            </ul>
            <p>
              Book My Stage reserves the right to moderate content to ensure
              participant safety and platform integrity.
            </p>
          </div>

          {/* Section 10 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">10. Consent Withdrawal</h5>
            <p>
              Parents or guardians may request withdrawal of optional recognition
              consent by contacting support. Upon verification, publicly
              displayed content will be removed within a reasonable timeframe.
            </p>
          </div>

          {/* Section 11 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              11. Limitation of Liability
            </h5>
            <ul>
              <li>False declarations made during submission</li>
              <li>Third-party misuse of shared links or content</li>
              <li>Technical issues beyond reasonable control</li>
            </ul>
          </div>

          {/* Section 12 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">12. Modifications</h5>
            <p>
              Book My Stage may update these Terms & Conditions periodically.
              Continued use of the platform constitutes acceptance of the updated
              terms.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;