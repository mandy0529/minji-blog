"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { blogValidator } from "@/lib/validators/blog";
import { toast } from "@/hook";
import { blogAPI } from "@/api/blog";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addHashtags } from "@/utils/add-hash-tag";
import { CreateBlogType } from "@/app/types";
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

const Page = () => {
  // define my custom form with z
  const form = useForm<z.infer<typeof blogValidator>>({
    resolver: zodResolver(blogValidator),
  });

  const { handleSubmit, control } = form;

  const router = useRouter();

  // tanstack query
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: CreateBlogType) => blogAPI.createBlog(data),
    onError: (error) => {
      // toast notification
      toast({
        title: "Failed to create Blog",
        //  @ts-ignore
        description: `${error?.response?.data?.message}`,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "success",
        description: "successfully created blog",
      });
      router.push("/blog");
    },
  });

  // onSubmit
  const onSubmit: SubmitHandler<z.infer<typeof blogValidator>> = (data) => {
    const hashtag = addHashtags(data.tag);
    const formatData = { ...data, tag: hashtag };
    mutate(formatData);
  };

  return (
    <Form {...form}>
      <form className="mt-20" onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <div className="text-4xl font-semibold text-center mb-10">
          Create Blog
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
          isLoading={isLoading}
        >
          Create Blog
        </Button>
      </form>
    </Form>
  );
};

export default Page;
