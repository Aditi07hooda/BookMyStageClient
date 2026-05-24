import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="hero position-relative overflow-hidden text-center">
      <span className="hero-deco tl">🎭</span>
      <span className="hero-deco tr">🎵</span>
      <span className="hero-deco bl">🎨</span>
      <span className="hero-deco br">🥁</span>

      <div className="container">
        <div className="hero-pill">
          Simple · Safe · Rewarding
        </div>

        <h1>
          How It <span className="pink">Works</span> on
          <br />
          <span className="blue">Book My Stage</span>
        </h1>

        <p>
          Give your child a stage from home — structured evaluation,
          a digital certificate, and the confidence to shine in front
          of the world.
        </p>

        <Link href="/performances" className="btn-pink">
          🎯 Book Your Child&apos;s Performance — ₹199 onwards
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;