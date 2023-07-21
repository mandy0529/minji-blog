"use client";

import { tokenType } from "@/app/types";
import { toast } from "@/hook";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const SocialLoginLoading = (result: any) => {
  // router
  const router = useRouter();

  // result값이 Error일때
  if (result.result?.error) {
    toast({
      title: "There was a problem",
      description: `${result.result?.message}`,
      variant: "destructive",
    });
    // result 성공 했을때
  } else {
    // cookie 설정
    setCookie("accessToken", result.result?.access_token);
    setCookie("refreshToken", result.result?.refresh_token);
    toast({
      title: "success",
      description: "successfully logined",
    });
  }

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center mb-4">...progress in logging in with</div>
    </div>
  );
};
