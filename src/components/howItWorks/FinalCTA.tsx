import Link from "next/link";

const FinalCTA = () => {
  return (
    <section className="section">
      <div className="container">

        <div className="final-cta">

          <h2>
            Ready to Give Your Child
            <br />
            Their Stage? 🎭
          </h2>

          <p>
            Join students across India who are building confidence.
          </p>

          <div className="price-pill">
            🎯 All performances starting at ₹199
          </div>

          <div className="final-btn-group">
            <Link href="/performances" className="btn-white">
              🎬 Book a Performance Now
            </Link>

            <Link href="/about" className="btn-outline-white">
              About Book My Stage
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;