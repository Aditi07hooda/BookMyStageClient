import TermsAndConditions from "@/components/PrivacyPolicy/TermsAndConditions";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <>
      <Wrapper>
        <main>
          <TermsAndConditions />
        </main>
      </Wrapper>
    </>
  );
};

export default page;
