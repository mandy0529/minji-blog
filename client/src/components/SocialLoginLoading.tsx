"use client";

import { tokenType } from "@/app/types";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SocialLoginLoading = ({ refresh_token, access_token }: tokenType) => {
  // router
  const router = useRouter();

  // cookie 설정
  setCookie("accessToken", access_token);
  setCookie("refreshToken", refresh_token);

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <div className="flex items-start justify-center mt-10 font-semibold text-3xl">
      로그인중 ...
    </div>
  );
};

export default SocialLoginLoading;
