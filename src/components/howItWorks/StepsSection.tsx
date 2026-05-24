import Link from "next/link";

const steps = [
  {
    number: 1,
    icon: "🎨",
    title: "Choose a Performance",
    desc: "Browse from exciting performance categories and choose what suits your child best.",
    tag: "🎭 10 categories to explore",
    className: "s1",
  },
  {
    number: 2,
    icon: "📋",
    title: "Register & Book",
    desc: "Complete details and confirm booking securely starting at ₹199.",
    tag: "✅ Secure payment · Instant confirmation",
    className: "s2",
  },
  {
    number: 3,
    icon: "🎬",
    title: "Submit Your Performance Video",
    desc: "Upload your child’s performance video directly from dashboard.",
    tag: "📱 Record at home · Upload in minutes",
    className: "s3",
  },
  {
    number: 4,
    icon: "⭐",
    title: "Certified Structured Evaluation",
    desc: "Every performance is evaluated using structured parameters.",
    tag: "🏅 5-parameter evaluation",
    className: "s4",
  },
  {
    number: 5,
    icon: "🎓",
    title: "Download & Celebrate",
    desc: "Get certificates, evaluation reports and recognition.",
    tag: "📜 Certificate + Report",
    className: "s5",
  },
];

const StepsSection = () => {
  return (
    <section className="section">
      <div className="container">

        <div className="sec-label">
          The Journey
        </div>

        <h2 className="sec-title">
          5 Simple Steps to the Spotlight
        </h2>

        <p className="sec-sub">
          From browsing to receiving your certificate —
          everything is smooth and guided.
        </p>

        <div className="steps">
          {steps.map((step) => (
            <div className={`step ${step.className}`} key={step.number}>

              <div className="step-col">
                <div className="step-num">
                  {step.number}
                </div>

                {step.number !== 5 && (
                  <div className="step-line"></div>
                )}
              </div>

              <div className="step-card">
                <div className="step-icon">
                  {step.icon}
                </div>

                <h3>{step.title}</h3>

                <p>{step.desc}</p>

                <span className="tag">
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link href="/performances" className="btn-pink">
            🎯 Browse & Book Now — from ₹199
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;