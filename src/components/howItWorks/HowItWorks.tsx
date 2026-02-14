import React from "react";

const HowItWorks: React.FC = () => {
  const stepStyle: React.CSSProperties = {
    borderRadius: "15px",
    padding: "25px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    marginBottom: "25px",
    transition: "transform 0.2s ease-in-out",
  };

  const circleStyle = (color: string): React.CSSProperties => ({
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: color,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "18px",
    marginRight: "15px",
  });

  return (
    <div
      className="container my-5"
      style={{
        maxWidth: "1000px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Header */}
      <div
        className="text-center text-white mb-5 p-5"
        style={{
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, #cb11b5 0%, #53aafc 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ fontWeight: 700 }}>How It Works</h2>
        <p style={{ color:'black', opacity: 0.9, marginTop: "10px" }}>
          Book My Stage helps school students participate in structured
          performance evaluations through a simple and guided journey.
        </p>
      </div>

      {/* Steps */}
      <div style={stepStyle} className="d-flex align-items-start">
        <div style={circleStyle("#ff6a00")}>1</div>
        <div>
          <h5 style={{ fontWeight: 600 }}>Choose a Performance</h5>
          <p style={{ color: "#555", marginBottom: 0 }}>
            Select a performance category and age group. Review guidelines
            before booking your performance slot.
          </p>
        </div>
      </div>

      <div style={stepStyle} className="d-flex align-items-start">
        <div style={circleStyle("#00b09b")}>2</div>
        <div>
          <h5 style={{ fontWeight: 600 }}>Register & Book</h5>
          <p style={{ color: "#555", marginBottom: 0 }}>
            Complete participant details and confirm your booking with secure
            payment.
          </p>
        </div>
      </div>

      <div style={stepStyle} className="d-flex align-items-start">
        <div style={circleStyle("#f7971e")}>3</div>
        <div>
          <h5 style={{ fontWeight: 600 }}>Submit Performance Video</h5>
          <p style={{ color: "#555", marginBottom: 0 }}>
            Upload your performance video from the dashboard within the
            submission window.
          </p>
        </div>
      </div>

      <div style={stepStyle} className="d-flex align-items-start">
        <div style={circleStyle("#8e2de2")}>4</div>
        <div>
          <h5 style={{ fontWeight: 600 }}>Evaluation & Recognition</h5>
          <p style={{ color: "#555", marginBottom: 0 }}>
            Expert professionals evaluate performances. Participants receive a
            detailed evaluation report and a verifiable digital certificate.
            Selected performances may earn special recognition or awards.
          </p>
        </div>
      </div>

      {/* What You Receive Section */}
      <div
        className="mt-5 p-4"
        style={{
          borderRadius: "15px",
          backgroundColor: "#f8f9ff",
          boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
        }}
      >
        <h4 style={{ fontWeight: 600, marginBottom: "20px" }}>
          What You Receive
        </h4>

        <div className="row text-center">
          <div className="col-md-3 mb-3">
            <div style={{ fontSize: "28px" }}>🎓</div>
            <p style={{ marginTop: "10px" }}>Expert Evaluation</p>
          </div>
          <div className="col-md-3 mb-3">
            <div style={{ fontSize: "28px" }}>📄</div>
            <p style={{ marginTop: "10px" }}>Detailed Report</p>
          </div>
          <div className="col-md-3 mb-3">
            <div style={{ fontSize: "28px" }}>🏅</div>
            <p style={{ marginTop: "10px" }}>
              Verifiable Digital Certificate
            </p>
          </div>
          <div className="col-md-3 mb-3">
            <div style={{ fontSize: "28px" }}>🌟</div>
            <p style={{ marginTop: "10px" }}>
              Recognition Opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Privacy & Eligibility */}
      <div className="row mt-5">
        <div className="col-md-6 mb-3">
          <div
            className="p-4 h-100"
            style={{
              borderRadius: "15px",
              backgroundColor: "#ffffff",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >
            <h5 style={{ fontWeight: 600 }}>Privacy & Participation</h5>
            <p style={{ color: "#555" }}>
              Public showcasing is optional and based on consent.
              Participation and evaluation remain unaffected by
              recognition choices.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div
            className="p-4 h-100"
            style={{
              borderRadius: "15px",
              backgroundColor: "#ffffff",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >
            <h5 style={{ fontWeight: 600 }}>Eligibility</h5>
            <p style={{ color: "#555" }}>
              Open to school students from Playschool to Grade 12.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;