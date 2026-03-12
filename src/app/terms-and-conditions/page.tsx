import PrivacyPolicyMain from "@/components/PrivacyPolicy/PrivacyPolicyMain";
import TermsAndConditions from "@/components/PrivacyPolicy/TermsAndConditions";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <>
      <Wrapper>
        <main>
          <PrivacyPolicyMain />
        </main>
      </Wrapper>
    </>
  );
};

export default page;
