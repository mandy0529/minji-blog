"use client";
import { blogAPI } from "@/api/blog";
import { userAPI } from "@/api/user";
import { toast } from "@/hook";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const page = () => {
  // 로그인한 유저와 blog유저 아이디가 일치하는지 확인

  // tanstack query
  const { isLoading, error, data, isInitialLoading } = useQuery({
    queryKey: ["getMyBlog"],
    queryFn: () => userAPI.getMyBlog(),
  });

  // error 있을때 error toast
  if (error) {
    toast({
      title: "Failed to get Blog",
      //  @ts-ignore
      description: `${error?.response?.data?.message}`,
      variant: "destructive",
    });
  }

  console.log(data, "data");

  return <div className="mt-20">only my blog page</div>;
};

export default page;
