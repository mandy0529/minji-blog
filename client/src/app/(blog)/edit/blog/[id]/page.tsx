"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { blogValidator } from "@/lib/validators/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/hook";
import { blogAPI } from "@/api/blog";
import { addHashtags } from "@/utils/add-hash-tag";
import * as z from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui";
import { CreateBlogType, singleDataType } from "@/app/types";

const page = ({ params }: { params: { id: number } }) => {
  // define my custom form with z
  const form = useForm<z.infer<typeof blogValidator>>({
    resolver: zodResolver(blogValidator),
  });

  const { handleSubmit, control } = form;
  const router = useRouter();

  // get single blog tanstack query
  const { error: singleBlogError, data } = useQuery<singleDataType>({
    queryKey: ["getSingleBlog"],
    queryFn: () => blogAPI.getSingleBlog(Number(params.id)),
    onSuccess: (data) => {
      form.reset({
        content: data.content,
        title: data.title,
        tag: data.tag.map((item) => item.replace("#", "")).join(","),
      });
    },
    onError: (error) => {
      console.log(error, "get single data error");
    },
  });

  // edit blog  tanstack query
  const { mutate: editMutate, isLoading: editLoading } = useMutation({
    mutationFn: (data: CreateBlogType) =>
      blogAPI.editSingleBlog(Number(params.id), data),
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
    console.log(data.tag, "@@TTag");

    const hashtag = addHashtags(data.tag);

    const formatData = { ...data, tag: hashtag };

    editMutate(formatData);
  };

  return (
    <Form {...form}>
      <form className="mt-20" onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <div className="text-4xl font-semibold text-center mb-10">
          Edit Blog
        </div>

        {/* title */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="mb-5">
                <FormLabel>Title</FormLabel>
                <FormControl className="mt-2">
                  <Input placeholder="your title" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* content */}
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <div>
              <FormItem>
                <div className="mb-5">
                  <FormLabel>Content</FormLabel>
                  <FormControl className="mt-2">
                    <Textarea
                      placeholder="Type your content here"
                      {...field}
                      maxLength={3000}
                      className="h-60"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            </div>
          )}
        />

        {/* hashtag */}
        <FormField
          control={control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <div className="mb-5">
                <FormLabel>Tag</FormLabel>
                <FormControl className="mt-2">
                  <Input placeholder="hashtag" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* submit button */}
        <Button
          disabled={!form.formState.isValid}
          className=" mt-5"
          type="submit"
          isLoading={editLoading}
        >
          Edit Blog
        </Button>
      </form>
    </Form>
  );
};

export default page;
