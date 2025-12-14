"use client";
import React, { useState } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useRouter } from "next/navigation";
import useGlobalContext from "@/hooks/use-context";
import Preloader from "../common/Preloader";
import axios from "axios";
import { toast } from "react-toastify";

const FacebookLoginButton = () => {
  const router = useRouter();
  const { loading, setLoading } = useGlobalContext();
  const [loginError, setloginError] = useState<string>("");

  const handleSuccess = async (response: any) => {
    try {
      const data = response;
      console.log("Facebook credential:", data);
      const res = await axios.post(
        "http://localhost:5000/user/facebook-login",
        {
          accessToken: response.accessToken,
        }
      );
      console.log("User logged in:", res);
      switch (res.data.message) {
        case "Login Successful":
          const token = res.data.token;
          localStorage.setItem("accessToken", token);
          router.push("/");
          toast.success(`Login Successful`);
          break;
        case "Token is required":
          setLoading(false);
          setloginError("Token is required");
          break;
        case "Invalid token payload":
          setLoading(false);
          setloginError("Invalid payload");
          break;
        default:
          setLoading(false);
          break;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_ID || ""}
        onSuccess={handleSuccess}
        onFail={(err) => console.error(err)}
        scope="email,public_profile,user_gender,user_location"
        
        render={({ onClick }) => (
        <button
          onClick={onClick}
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: "#1877F2",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            fill="white"
            viewBox="0 0 320 512"
          >
            <path d="M279.14 288l14.22-92.66h-88.91V129.31c0-25.35 12.42-50.06 
            52.24-50.06H295V6.26S259.77 0 225.36 0c-73.22 
            0-121.09 44.38-121.09 124.72v70.62H22.89V288h81.38v224h100.17V288z" />
          </svg>
        </button>
      )}
      />
    </>
  );
};

export default FacebookLoginButton;
