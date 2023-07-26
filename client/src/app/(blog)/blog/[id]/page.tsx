"use client";
import { blogAPI } from "@/api/blog";
import { toast } from "@/hook";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton } from "@/components/ui";
import { BlogSkeleton } from "@/components/skeleton/blog.skeleton";
import UserAvatar from "@/components/navbar/UserAvatar";
import Markdown from "markdown-to-jsx";
import { koreanDateTime } from "@/utils/convert-korean-time";
import { singleDataType } from "@/app/types";

const page = ({ params }: { params: { id: number } }) => {
  // tanstack query
  const { isLoading, error, data } = useQuery<singleDataType>({
    queryKey: ["getSingleBlog"],
    queryFn: () => blogAPI.getSingleBlog(Number(params.id)),
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

  if (!data) return;

  const { content, id, author, title, tag, createdAt } = data;

  return (
    <div className="mt-20 place-content-center">
      {isLoading ? (
        <BlogSkeleton />
      ) : (
        <>
          {/* user info */}
          <div className="flex items-center mb-10">
            <UserAvatar className="mr-3" user={author} />
            <div className="font-bold text-lg">
              {author.email?.split("@")[0]}님의 글
            </div>
            <div className="ml-3 text-gray-500 dark:text-gray-200">
              {koreanDateTime(createdAt)}
            </div>
          </div>

          {/* blog info */}
          <div>
            {tag?.map((item) => (
              <Button className="mr-4" variant={"outline"}>
                {item}
              </Button>
            ))}
          </div>
          <div className="text-3xl font-bold my-5">{title}</div>
          <article className="prose prose-slate dark:prose-invert">
            <Markdown>{content}</Markdown>
          </article>
        </>
      )}
    </div>
  );
};

export default page;
