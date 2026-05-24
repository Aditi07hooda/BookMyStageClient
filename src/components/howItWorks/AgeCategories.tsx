import Link from "next/link";

const ages = [
  {
    emoji: "🌱",
    title: "Tiny Stars",
    range: "Age 4 – 8",
    desc: "First steps into performing arts.",
    className: "ac1",
  },
  {
    emoji: "⭐",
    title: "Super Kids",
    range: "Age 8 – 12",
    desc: "Growing talents ready to shine.",
    className: "ac2",
  },
  {
    emoji: "🌟",
    title: "Cool Champs",
    range: "Age 12 – 15",
    desc: "Developing performers building confidence.",
    className: "ac3",
  },
  {
    emoji: "🏆",
    title: "Teen Titans",
    range: "Age 15 – 18",
    desc: "Confident performers ready to impress.",
    className: "ac4",
  },
];

const AgeCategories = () => {
  return (
    <section className="section soft">
      <div className="container">

        <div className="sec-label">
          Fair for Every Age
        </div>

        <h2 className="sec-title">
          Your Child Competes Within Their Own Age Group
        </h2>

        <div className="row g-4 mt-4">
          {ages.map((age, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className={`age-card ${age.className}`}>
                <div className="emoji">{age.emoji}</div>

                <h4>{age.title}</h4>

                <div className="range">
                  {age.range}
                </div>

                <p>{age.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="age-cta">
          <p>
            Browse all performances and filter by age group.
          </p>

          <Link href="/performances" className="btn-blue">
            🎨 Browse Performances by Age
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AgeCategories;