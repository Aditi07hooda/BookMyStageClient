import React from "react";
import LoginForm from "@/form/login-form";
import { GoogleLoginButton } from "./GoogleLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";

const LoginMain = () => {
  return (
    <>
      <div className="col container bd-login__area pt-5 pb-5 pt-md-7 pb-md-8 w-auto">
        <LoginForm />
        <div className="d-flex flex-column align-items-center text-center my-3">
          <p className="mb-3 text-muted">or use one of these options</p>
          <div className="d-flex gap-2">
            <GoogleLoginButton />
            <FacebookLoginButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginMain;
