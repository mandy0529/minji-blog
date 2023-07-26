"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { blogValidator } from "@/lib/validators/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hook";
import { blogAPI } from "@/api/blog";
import { addHashtags } from "@/utils/add-hash-tag";
import * as z from "zod";
const page = () => {
  // define my custom form with z
  const form = useForm<z.infer<typeof blogValidator>>({
    resolver: zodResolver(blogValidator),
  });

  const { handleSubmit, control } = form;

  const router = useRouter();

  // tanstack query edit
  const { mutate: editMutate, isLoading: editLoading } = useMutation({
    mutationFn: (data: any) => blogAPI.editSingleBlog(id, data),
    onError: (error) => {
      // toast notification
      toast({
        title: "Failed to edit Blog",
        //  @ts-ignore
        description: `${error?.response?.data?.message}`,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "success",
        description: "successfully edited blog",
      });
      router.push("/my-blog");
    },
  });

  // onSubmit
  const onSubmit: SubmitHandler<z.infer<typeof blogValidator>> = (data) => {
    const hashtag = addHashtags(data.tag);
    const formatData = { ...data, tag: hashtag };
    // editMutate(formatData);
  };

  return <div className="mt-20">edit blog</div>;
};

export default page;
