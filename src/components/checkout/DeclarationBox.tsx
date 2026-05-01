import { useState } from "react";

interface DeclarationBoxProps {
  onConsentChange: (consent: boolean) => void;
}

const DeclarationBox: React.FC<DeclarationBoxProps> = ({ onConsentChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const shortText = `
I have read and agree to the Consent, Terms, Privacy Policy, and Refund Policy.
  `;

  const fullText = `
I have read and agree to the Consent, Terms, Privacy Policy, and Refund Policy.
This includes confirmation that I am the parent/legal guardian (if applicable),
and I consent to the use of performance content on platforms like YouTube,
social media, and official channels for recognition and promotional purposes.
  `;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setIsChecked(value);
    onConsentChange(value); // pass to parent to control booking button
  };

  return (
    <div className="mt-4 p-3 border rounded">
      <h5 className="mb-3">
        Declaration Consent <span style={{ color: "red" }}>*</span>
      </h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="declarationConsent"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />

        <label className="form-check-label" htmlFor="declarationConsent">
          {expanded ? fullText : shortText}

          <span
            onClick={(e) => {
              e.preventDefault();
              setExpanded(!expanded);
            }}
            style={{
              color: "blue",
              cursor: "pointer",
              marginLeft: "5px",
              textDecoration: "underline",
            }}
          >
            {expanded ? " Show less" : " Click here"}
          </span>
        </label>
      </div>
    </div>
  );
};

export default DeclarationBox;