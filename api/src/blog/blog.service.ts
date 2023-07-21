import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto, EditBlogDto } from './dto';
import { blogType } from './types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}
  // create blog  -----------------------------------------------
  async createBlog(userId: string, dto: CreateBlogDto): Promise<string> {
    await this.prisma.blog.create({
      data: {
        ...dto,
        authorId: userId,
      },
    });
    return 'successfully created blog';
  }

  // get all blog -----------------------------------------------
  async getAllBlog() {
    const blog = await this.prisma.blog.findMany({
      include: {
        author: {
          select: {
            email: true,
            profile: true,
          },
        },
      },
    });

    return blog;
  }

  // get single blog -----------------------------------------------
  async getSingleBlog(blogId: number) {
    // found blog from prisma
    const blog = await this.prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
    });

    // 해당 id로 blog가 없을때 return
    if (!blog) return new NotFoundException(`blog not found with id ${blogId}`);

    // return
    return blog;
  }

  // edit single blog -----------------------------------------------

  async editBlog(
    userId: string,
    blogId: number,
    dto: EditBlogDto,
  ): Promise<NotFoundException | string> {
    // find blog with id
    const existBlog = await this.prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    // 해당 id로 blog가 없을 때
    if (!existBlog)
      return new NotFoundException(`blog not found with id ${blogId}`);

    // update blog
    await this.prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        ...dto,
        authorId: userId,
      },
    });

    // return result
    return 'successfully edited blog';
  }

  // delete single blog -----------------------------------------------
  async deleteBlog(userId: string, blogId: number) {
    // 해당 blogId와 userId로 블로그 내 db에서 찾기
    const existBlog = await this.prisma.blog.findFirst({
      where: {
        id: blogId,
        authorId: userId,
      },
    });

    // blog가 없으면
    if (!existBlog)
      return new NotFoundException(`blog not found with id ${blogId}`);

    // blog있으면 내 db에서 삭제시켜주기
    await this.prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
    return 'successfully deleted blog';
  }
}
