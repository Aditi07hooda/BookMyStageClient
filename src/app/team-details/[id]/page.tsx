import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import TeamDetailsMain from "@/components/team-details/TeamDetailsMain";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

type Params = Promise<{ id: string }>;

const TeamDetailsPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <>
      <Wrapper>
        <main>
          <Breadcrumb breadHome="Home" breadMenu="Team Details" />
          <TeamDetailsMain id={id} />
        </main>
      </Wrapper>
    </>
  );
};

export default TeamDetailsPage;
