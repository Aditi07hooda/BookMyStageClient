import React from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";

const PrivacyPolicyMain = () => {
  return (
    <>
      <section className="terms_conditions_section section_space_lg pt-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ul
                className="nav tabs_nav_boxed unordered_list_block mb-60"
                role="tablist"
              >
                <li role="presentation">
                  <button
                    className="active"
                    data-bs-toggle="tab"
                    data-bs-target="#tab_privacy_policy"
                    type="button"
                    role="tab"
                    aria-selected="false"
                  >
                    <i className="fas fa-circle"></i>
                    <span>Policy & Privacy</span>
                  </button>
                </li>
                <li role="presentation">
                  <button
                    data-bs-toggle="tab"
                    data-bs-target="#tab_terms_conditions"
                    type="button"
                    role="tab"
                    aria-selected="true"
                  >
                    <i className="fas fa-circle"></i>
                    <span>Terms & Conditions</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-lg-9">
              <div className="tab-content mb-60">
                <div
                  className="tab-pane fade show active"
                  id="tab_privacy_policy"
                  role="tabpanel"
                >
                  <div className="terms_conditions_content">
                    <PrivacyPolicy />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab_terms_conditions"
                  role="tabpanel"
                >
                  <div className="terms_conditions_content">
                    <TermsAndConditions />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyMain;
