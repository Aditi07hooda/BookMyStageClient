import React from "react";

const sectionStyle: React.CSSProperties = {
  backgroundColor: "#f8f9ff",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "25px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
};

const PrivacyPolicy: React.FC = () => {
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
              🔐 Privacy Policy
            </h1>
            <h5 className="fw-semibold text-secondary">
              Book My Stage – Digital Center for Performing Arts
            </h5>
            <p className="text-muted">Last updated: 21/01/2026</p>
          </div>

          {/* Section 1 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              1. Our Commitment to Privacy
            </h5>
            <p>
              Book My Stage is committed to protecting the privacy and safety
              of children and their families. We collect and process data
              responsibly and transparently.
            </p>
          </div>

          {/* Section 2 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              2. Information We Collect
            </h5>
            <ul>
              <li>Participant name, age group, and performance details</li>
              <li>Parent/guardian contact information (if provided)</li>
              <li>Uploaded performance videos</li>
              <li>
                Consent selections and submission metadata (timestamp, IP
                address)
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              3. How We Use Information
            </h5>
            <ul>
              <li>Performance evaluation</li>
              <li>Certification and verification</li>
              <li>Platform operations</li>
              <li>
                Optional recognition and showcasing (only with consent)
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              4. Children’s Data Protection
            </h5>
            <ul>
              <li>
                We process children’s data only with parent/guardian declaration
                or consent.
              </li>
              <li>Performance videos are private by default.</li>
              <li>
                Public display or sharing occurs only when optional consent is
                provided.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              5. Video Processing & Storage
            </h5>
            <ul>
              <li>Uploaded videos are stored securely.</li>
              <li>
                Videos are accessed only by authorized evaluators and the
                participant’s account.
              </li>
              <li>
                Selected videos may be processed with a standard platform
                intro/outro for authenticity.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              6. Public Recognition & Sharing
            </h5>
            <ul>
              <li>
                Videos or performance details are shared publicly only if
                consent is given.
              </li>
              <li>No personal contact details are displayed publicly.</li>
              <li>
                Parents may withdraw public recognition consent at any time.
              </li>
            </ul>
          </div>

          {/* Section 7 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              7. Data Retention
            </h5>
            <p>
              Data is retained only as long as necessary for platform operations
              or legal compliance. Upon valid request, content will be removed or
              anonymized where applicable.
            </p>
          </div>

          {/* Section 8 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              8. Data Security
            </h5>
            <p>
              We use reasonable technical and organizational measures to protect
              personal data against unauthorized access, misuse, or disclosure.
            </p>
          </div>

          {/* Section 9 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              9. Third-Party Platforms
            </h5>
            <p>
              If content is shared on third-party platforms (e.g., YouTube),
              their respective privacy policies apply in addition to ours.
            </p>
          </div>

          {/* Section 10 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              10. Updates to This Policy
            </h5>
            <p>
              This Privacy Policy may be updated periodically. Changes will be
              reflected on this page.
            </p>
          </div>

          {/* Section 11 */}
          <div style={sectionStyle}>
            <h5 className="fw-bold text-primary">
              11. Contact Us
            </h5>
            <div
              className="text-center p-3 mt-3"
              style={{
                backgroundColor: "#e7edff",
                borderRadius: "12px",
                fontWeight: 500,
              }}
            >
              <p>For privacy-related concerns or data requests, contact:</p>
              <p style={{ color: "#1e3a8a" }}>
                📧 your-support-email@example.com
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;