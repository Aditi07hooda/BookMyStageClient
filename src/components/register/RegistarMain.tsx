import React from "react";
import RegistrationForm from "@/form/register-form";
import { GoogleLoginButton } from "../login/GoogleLoginButton";
import FacebookLoginButton from "../login/FacebookLoginButton";

const RegistarMain = () => {
  return (
    <>
      <div className="col container bd-login__area pt-5 pt-md-7 w-auto">
        <RegistrationForm />
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

export default RegistarMain;
