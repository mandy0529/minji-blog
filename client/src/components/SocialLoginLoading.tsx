"use client";

import { tokenType } from "@/app/types";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Progress } from "./ui";

export const SocialLoginLoading = ({
  refresh_token,
  access_token,
}: tokenType) => {
  // router
  const router = useRouter();

  // cookie 설정
  setCookie("accessToken", access_token);
  setCookie("refreshToken", refresh_token);

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center mb-4">...progress in logging in</div>
    </div>
  );
};
