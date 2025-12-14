"use client";
import useGlobalContext from "@/hooks/use-context";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Preloader from "../common/Preloader";
import Image from "next/image";
import GoogleLogo from "../../../public/assets/img/login/google-icon.png";

export const GoogleLoginButton = () => {
  const router = useRouter();
  const { loading, setLoading } = useGlobalContext();
  const [loginError, setLoginError] = useState<string>("");
  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google token response:", tokenResponse);
        setLoading(true);
        const res = await axios.post(
          "http://localhost:5000/user/google-login",
          { token: tokenResponse.access_token }
        );
        switch (res.data.message) {
          case "Login Successful":
            localStorage.setItem("accessToken", res.data.token);
            router.push("/");
            toast.success("Login Successful");
            break;
          case "Token is required":
            setLoginError("Token is required");
            break;
          case "Invalid token payload":
            setLoginError("Invalid payload");
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Login failed:", error);
        setLoginError("Login failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setLoginError("Google login failed");
    },
  });
  if (loading) {
    return <Preloader />;
  }
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <button
        onClick={() => login()}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          backgroundColor: "#fff",
          border: "1px solid #dadce0",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 1px 3px rgba(60,64,67,0.3)",
          transition: "all 0.2s ease",
        }}
        aria-label="Login with Google"
      >
        <Image src={GoogleLogo} alt="Google" width={40} height={40} />
      </button>
      {loginError && (
        <p style={{ color: "red", marginTop: "8px", fontSize: "14px" }}>
          {loginError}
        </p>
      )}
    </GoogleOAuthProvider>
  );
};
