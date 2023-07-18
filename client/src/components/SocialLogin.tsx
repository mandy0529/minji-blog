"use client";

import { tokenType } from "@/app/types";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SocialLogin = ({ refresh_token, access_token }: tokenType) => {
  // router
  const router = useRouter();

  // cookie 설정
  setCookie("accessToken", access_token);
  setCookie("refreshToken", refresh_token);

  useEffect(() => {
    router.push("/");
  }, []);

  return <div>Social-login</div>;
};

export default SocialLogin;
