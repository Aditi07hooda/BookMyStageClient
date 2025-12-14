//@refresh

import HomeTwoMain from "@/components/home-two/HomeTwoMain";
// import HomeMain from "@/components/home/HomeMain";
import Wrapper from "@/layout/DefaultWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Home = () => {
  return (
    <>
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <Wrapper>
        <main>
          <HomeTwoMain />
        </main>
      </Wrapper>
    </GoogleOAuthProvider>
    </>
  );
}

export default Home