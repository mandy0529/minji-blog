import { Button } from "@/components/ui";
import React from "react";
import UserAvatar from "./navbar/UserAvatar";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlogType } from "@/app/types";
import { blogAPI } from "@/api/blog";
import { toast } from "@/hook";
import { useMutation } from "@tanstack/react-query";

interface IBlogType {
  blog: BlogType;
  isLoading: boolean;
  adminMode: boolean;
}
const Blog = ({ blog, isLoading, adminMode }: IBlogType) => {
  const { content, id, author, title, tag } = blog;

  // tanstack query delete
  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id: number) => blogAPI.deleteSingleBlog(Number(id)),
    onError: (error) => {
      // toast notification
      toast({
        title: "Failed to delete Blog",
        //  @ts-ignore
        description: `${error?.response?.data?.message}`,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "success",
        description: "successfully deleted blog",
      });
      window.location.reload();
    },
  });

  return (
    <div
      key={id}
      className="relative max-w-sm p-6 mb-5 mr-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      {adminMode && (
        <div className="mb-5">
          <Link href={`/edit/blog/${id}`}>
            <Button>Edit</Button>
          </Link>

          <Button
            onClick={() => deleteMutate(id)}
            className=" bg-red-800 ml-2"
            variant={"destructive"}
            isLoading={deleteLoading}
          >
            Delete
          </Button>
        </div>
      )}
      <div className="flex mb-2 opacity-50">
        {tag?.length > 3
          ? tag?.map((item) => <div className="mr-2">{item}</div>).slice(0, 3)
          : tag?.map((item) => <div className="mr-2">{item}</div>)}
      </div>
      <div className="flex items-center">
        <UserAvatar user={author} />
        <h5 className="mb-2 ml-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title.length > 10 ? `${title.slice(0, 8)}...` : title}
        </h5>
      </div>

      <article className="prose prose-slate my-5 pb-5 dark:prose-invert">
        <Markdown className="my-5 font-normal text-gray-700 dark:text-gray-400">
          {content.length > 30 ? content.slice(0, 50) : content}
        </Markdown>
      </article>

      <Link href={`/blog/${id}`}>
        <Button
          className="absolute m-2 bottom-1 left-0"
          variant={"subtle"}
          isLoading={isLoading}
        >
          Read
          <ChevronRight />
        </Button>
      </Link>
    </div>
  );
};

export default Blog;
