const items = [
  {
    icon: "📊",
    title: "Certified Structured Evaluation",
    desc: "5-parameter framework with ratings.",
    className: "rc1",
  },
  {
    icon: "📄",
    title: "Detailed Evaluation Report",
    desc: "Personalised written report.",
    className: "rc2",
  },
  {
    icon: "🏅",
    title: "Verifiable Digital Certificate",
    desc: "Shareable certificate for every participant.",
    className: "rc3",
  },
  {
    icon: "🌟",
    title: "Recognition & Awards",
    desc: "Top performers earn recognition.",
    className: "rc4",
  },
];

const ReceiveSection = () => {
  return (
    <section className="section soft">
      <div className="container">

        <div className="sec-label">
          Every Child Receives
        </div>

        <h2 className="sec-title">
          More Than Just Participation
        </h2>

        <div className="row g-4 mt-4">
          {items.map((item, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className={`rc-card ${item.className}`}>
                <div className="rc-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReceiveSection;