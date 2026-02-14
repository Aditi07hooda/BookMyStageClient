import React from "react";
import thumbOne from "../../../public/assets/img/about/about-img-3.jpg";
import thumbTwo from "../../../public/assets/img/about/about-img-4.jpg";
import thumbThree from "../../../public/assets/img/about/about-img-5.jpg";
import authorImg from "../../../public/assets/img/about/about-author.png";
import authorSigneture from "../../../public/assets/img/about/author-signature.png";
import Image from "next/image";
const AboutSectionTwo = () => {
  return (
    <section className="bd-about__area pt-130 pb-65">
      <div className="container">
        <div className="row g-0">
          <div className="col-xxl-5 col-xl-5 col-lg-6">
            <div className="bd-about__wrapper mb-60">
              <div className="bd-about__image-1 m-img mb-60">
                <Image src={thumbOne} alt="about-image" />
              </div>
              <div className="bd-about__image-2 m-img">
                <Image src={thumbTwo} alt="about-image" />
              </div>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7 col-lg-6">
            <div className="bd-about__content-box mb-60">
              <div className="bd-section__title-wrapper mb-50">
                <span className="bd-sub__title">About Us</span>
                <h2 className="bd-section__title mb-30">
                  Digital Center for <br /> Performing Arts
                </h2>
              </div>
              <div className="bd-about__inner">
                <div className="bd-about__image-3">
                  <Image src={thumbThree} alt="about-image" />
                </div>
                <div className="bd-about__info">
                  <p>
                    Book My Stage is a digital center for performing arts
                    created to support school students in showcasing their
                    talents in a structured, safe, and meaningful way. We
                    believe that performances should be more than one-time
                    events—they should lead to learning, confidence building,
                    and growth. Our platform enables students to participate in
                    various performance categories and receive expert evaluation
                    that is age-appropriate, transparent, and focused on
                    development rather than comparison. At Book My Stage, every
                    performance is treated as a learning opportunity. Students
                    receive detailed evaluation reports and shareable,
                    verifiable digital certificates that reflect their effort
                    and progress. Selected performances are recognized across
                    age categories, while public showcasing is always
                    consent-based. Designed with a child-first and privacy-aware
                    approach, Book My Stage aims to become a trusted digital
                    space where creativity is encouraged, talent is nurtured,
                    and every student is given the opportunity to grow with
                    confidence.
                  </p>
                  <div className="bd-about__author">
                    <div className="bd-about__author-thumb">
                      <Image src={authorImg} alt="about-image" />
                    </div>
                    <div className="bd-about__author-info">
                      <h4>Kesavamoorthy R</h4>
                      <span>Founder & CEO, Book My Stage</span>
                      <div className="ba-author__signature">
                        <Image src={authorSigneture} alt="about-image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
