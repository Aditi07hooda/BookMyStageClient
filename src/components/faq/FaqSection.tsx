import React from "react";

const FaqSection = () => {
  return (
    <section className="bd-faq__area pt-115 pb-95">
      <div className="container small-container">
        <div className="row">

          {/* LEFT COLUMN */}
          <div className="col-lg-6">
            <div className="bd-faq__wrapper mb-30">
              <div className="bd-faq__accordion">
                <div className="accordion" id="accordionExample">

                  {/* 1 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        Is Book My Stage a competition or an evaluation platform?
                      </button>
                    </h2>
                    <div id="collapseOne"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Book My Stage is primarily a performance evaluation and recognition platform. Selected top performers may receive awards and recognition, but the focus is on learning, feedback, and growth—not just winning.
                      </div>
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo">
                        Who evaluates the performances?
                      </button>
                    </h2>
                    <div id="collapseTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Performances are evaluated by experienced professionals in the respective performance domain using a structured and age-appropriate evaluation framework.
                      </div>
                    </div>
                  </div>

                  {/* 3 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree">
                        Which age groups can participate?
                      </button>
                    </h2>
                    <div id="collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Book My Stage is open to school students up to Grade 12, grouped into age categories to ensure fair and relevant evaluation.
                      </div>
                    </div>
                  </div>

                  {/* 4 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour">
                        How many performances can my child submit?
                      </button>
                    </h2>
                    <div id="collapseFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Participants may submit multiple performances, but each performance requires a separate booking and submission.
                      </div>
                    </div>
                  </div>

                  {/* 5 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive">
                        What do participants receive after evaluation?
                      </button>
                    </h2>
                    <div id="collapseFive"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Participants receive a detailed evaluation report, scores, and a shareable & verifiable digital certificate. Selected performers will also receive awards and recognition.
                      </div>
                    </div>
                  </div>

                  {/* 6 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSix">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSix">
                        Is this safe for children?
                      </button>
                    </h2>
                    <div id="collapseSix"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Yes. Book My Stage follows a child-first and privacy-aware approach. Performances are evaluated securely, and public showcasing is done only with explicit consent.
                      </div>
                    </div>
                  </div>

                  {/* 7 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSeven">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSeven">
                        When will the evaluation be completed?
                      </button>
                    </h2>
                    <div id="collapseSeven"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Evaluation reports are delivered within 10 working days from successful video submission.
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-lg-6">
            <div className="bd-faq__wrapper-2 mb-30">
              <div className="accordion" id="accordionExample2">

                {/* 8 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingEight">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEight">
                      Can I upload the video later?
                    </button>
                  </h2>
                  <div id="collapseEight"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Yes. After booking, you can upload the performance video from your dashboard within the submission window.
                    </div>
                  </div>
                </div>

                {/* 9 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingNine">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseNine">
                      Is the payment refundable?
                    </button>
                  </h2>
                  <div id="collapseNine"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Once a performance is booked, the booking amount is non-refundable. Please review performance guidelines before submission.
                    </div>
                  </div>
                </div>

                {/* 10 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTen">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTen">
                      Where do I upload my performance video?
                    </button>
                  </h2>
                  <div id="collapseTen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Go to My Bookings → Manage Submissions and upload your video as per the guidelines.
                    </div>
                  </div>
                </div>

                {/* 11 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingEleven">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEleven">
                      How can I check my evaluation status?
                    </button>
                  </h2>
                  <div id="collapseEleven"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Your evaluation status is visible under My Evaluations in the dashboard.
                    </div>
                  </div>
                </div>

                {/* 12 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwelve">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwelve">
                      Where can I download the evaluation report?
                    </button>
                  </h2>
                  <div id="collapseTwelve"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Once evaluation is complete, the report can be downloaded from My Evaluations.
                    </div>
                  </div>
                </div>

                {/* 13 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThirteen">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThirteen">
                      How do I access my certificate?
                    </button>
                  </h2>
                  <div id="collapseThirteen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Your shareable and verifiable digital certificate will be available under the Certificates section.
                    </div>
                  </div>
                </div>

                {/* 14 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFourteen">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFourteen">
                      How can I submit a review?
                    </button>
                  </h2>
                  <div id="collapseFourteen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Only participants can submit reviews. After evaluation completion, you’ll see an option to rate and review your experience.
                    </div>
                  </div>
                </div>

                {/* 15 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFifteen">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFifteen">
                      Can parents submit performances on behalf of children?
                    </button>
                  </h2>
                  <div id="collapseFifteen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Yes. Parents or guardians can register and submit performances on behalf of the participant.
                    </div>
                  </div>
                </div>

                {/* 16 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSixteen">
                    <button className="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSixteen">
                      How can I contact support?
                    </button>
                  </h2>
                  <div id="collapseSixteen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      You can reach us via the Contact page or email us. Our team typically responds within 48 working hours.
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

export default FaqSection;