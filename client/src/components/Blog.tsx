import { Button } from "@/components/ui";
import React, { FC } from "react";
import UserAvatar from "./navbar/UserAvatar";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlogType } from "@/app/types";

interface IBlogType {
  blog: BlogType;
  isLoading: boolean;
}
const Blog = ({ blog, isLoading }: IBlogType) => {
  const { content, id, author, title } = blog;
  return (
    <div
      key={id}
      className="relative max-w-sm p-6 mb-5 mr-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center">
        <UserAvatar user={author} />
        <h5 className="mb-2 ml-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title.length > 10 ? `${title.slice(0, 10)}...` : title}
        </h5>
      </div>

      <article className="prose prose-slate my-5 pb-5 dark:prose-invert">
        <Markdown className="my-5 font-normal text-gray-700 dark:text-gray-400">
          {content.length > 30 ? content.slice(0, 50) : content}
        </Markdown>
      </article>

      <Link href={`/blog/${id}`}>
        <Button
          className="absolute m-2 bottom-0 left-0"
          variant={"subtle"}
          isLoading={isLoading}
        >
          Read more
          <ChevronRight />
        </Button>
      </Link>
    </div>
  );
};

export default Blog;
