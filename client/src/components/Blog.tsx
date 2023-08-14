import { Button } from "@/components/ui";
import UserAvatar from "./navbar/UserAvatar";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
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
    <Link
      className={`max-w-sm p-6 mb-5 mr-5 bg-white border ${
        !adminMode && "hover:bg-zinc-100 dark:hover:opacity-60"
      } border-gray-200 rounded-lg shadow dark:bg-gray-800  dark:border-gray-700 transition-all duration-300`}
      href={`/blog/${id}`}
      key={id}
    >
      <div className="flex mb-2 opacity-50">
        {tag?.length > 3
          ? tag?.map((item) => <div className="mr-2">{item}</div>).slice(0, 3)
          : tag?.map((item) => <div className="mr-2">{item}</div>)}
      </div>
      <div className="flex items-center">
        <UserAvatar user={author} />
        <h5 className="line-clamp-3 ml-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </div>

      <article className="prose prose-slate text-sm my-2 pb-3 dark:prose-invert">
        <Markdown className="line-clamp-3 mt-5 font-normal text-gray-700 dark:text-gray-400">
          {content}
        </Markdown>
      </article>

      {/* admin mode button */}
      {adminMode && (
        <div>
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
    </Link>
  );
};

export default Blog;
