"use client";
import { useUserInfo } from "@/hook";
import { useRouter } from "next/navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();
  const { isLogin, loading } = useUserInfo();

  console.log(isLogin, "isLogin");

  if (loading) return <div>loaindg ... </div>;

  if (!loading && !isLogin) return push("/login");

  return <div className="mt-20">{children}</div>;
};

export default layout;
