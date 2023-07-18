"use client";
import { tokenType } from "@/app/types";
import { setCookie } from "cookies-next";

const SocialLogin = ({ refresh_token, access_token }: tokenType) => {
  // cookie 설정
  setCookie("accessToken", access_token);
  setCookie("refreshToken", refresh_token);

  return <div>Social-login</div>;
};

export default SocialLogin;
