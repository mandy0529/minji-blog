"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();
  const { isLogin, loading } = useGlobalContext();

  if (loading) return <div className="mt-20">loading ... </div>;

  if (!loading && !isLogin) return push("/login");

  return <div className="mt-20">{children}</div>;
};

export default Layout;
