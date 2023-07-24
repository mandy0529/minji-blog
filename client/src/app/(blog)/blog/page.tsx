'use client';
import { blogAPI } from '@/api/blog';
import UserAvatar from '@/components/navbar/UserAvatar';
import { Button } from '@/components/ui';
import { toast } from '@/hook';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';

export interface BlogType {
  id: number;
  title: string;
  content: string;
  tag: string[];
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: Author;
}

export interface Author {
  email: string;
  profile: string;
}

const page = () => {
  // tanstack query
  const { isLoading, error, data, isInitialLoading } = useQuery({
    queryKey: ['getAllBlogs'],
    queryFn: () => blogAPI.getAllBlogs(),
  });

  // error 있을때 error toast
  if (error) {
    toast({
      title: 'Failed to get Blog',
      //  @ts-ignore
      description: `${error?.response?.data?.message}`,
      variant: 'destructive',
    });
  }

  return (
    <section className="mt-16 grid grid-cols-1-auto sm:grid-cols-2-auto md:grid-cols-3-auto lg:grid-cols-4-auto">
      {data?.map((blog: BlogType) => {
        const { content, id, author, title } = blog;

        return (
          <div
            key={id}
            className="relative max-w-sm p-6 my-5 mx-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
                variant={'subtle'}
                isLoading={isLoading}
              >
                Read more
                <ChevronRight />
              </Button>
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default page;
