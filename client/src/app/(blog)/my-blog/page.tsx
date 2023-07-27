"use client";

import { userAPI } from "@/api/user";
import { BlogType } from "@/app/types";
import Blog from "@/components/Blog";
import { toast } from "@/hook";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const page = () => {
  // tanstack query
  const { isLoading, error, data } = useQuery({
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

  return (
    <div>
      <div className="text-xl font-bold text-center">My Blog</div>
      <section className="mt-16 grid grid-cols-1-auto sm:grid-cols-1-auto md:grid-cols-2-auto lg:grid-cols-3-auto">
        {data?.length !== 0 ? (
          data?.map((blog: BlogType) => {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                isLoading={isLoading}
                adminMode={true}
              />
            );
          })
        ) : (
          <div className="text-center">No Your Blog</div>
        )}
      </section>
    </div>
  );
};

export default page;
