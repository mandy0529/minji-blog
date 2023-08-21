import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto, EditCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  // create comment -------------------------------------------------
  async createComment(userId: string, blogId: number, dto: CreateCommentDto) {
    await this.prisma.comment.create({
      data: {
        ...dto,
        authorId: userId,
        blogId,
      },
    });
    return { msg: 'successfully created comment' };
  }

  // get all comment
  async getAllComment() {
    const comment = await this.prisma.comment.findMany({
      include: {
        author: {
          select: {
            email: true,
            profile: true,
          },
        },
        blog: {
          select: {
            title: true,
            content: true,
          },
        },
      },
    });
    return { comment };
  }

  // get single comment
  async getSingleComment(commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        author: {
          select: {
            email: true,
            profile: true,
          },
        },
        blog: {
          select: {
            title: true,
            content: true,
          },
        },
      },
    });
    return { comment };
  }

  // edit single comment
  async editSingleComment(
    authorId: string,
    commentId: number,
    blogId: number,
    dto: EditCommentDto,
  ) {
    // 해당 comment찾기
    const existComment = await this.prisma.comment.findFirst({
      where: {
        id: commentId,
        authorId,
      },
    });

    // 해당 id로 blog가 없을 때
    if (!existComment)
      return new NotFoundException(
        `comment not found with id ${blogId} for this user.`,
      );

    // find blog with id
    const existBlog = await this.prisma.blog.findFirst({
      where: {
        id: blogId,
        authorId,
      },
    });

    // 해당 id로 blog가 없을 때
    if (!existBlog)
      return new NotFoundException(
        `blog not found with id ${blogId} for this user.`,
      );

    //  update comment
    await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        ...dto,
        authorId,
        blogId,
      },
    });
    return { msg: 'successfully edited comment' };
  }

  // delete single comment
  async deleteSingleComment(
    authorId: string,
    commentId: number,
    blogId: number,
  ) {
    // 해당 commentId와 userId로 comment 내 db에서 찾기
    const existComment = await this.prisma.comment.findFirst({
      where: {
        id: commentId,
        authorId,
      },
    });

    // 해당 id로 blog가 없을 때
    if (!existComment)
      return new NotFoundException(
        `comment not found with id ${blogId} for this user`,
      );

    // find blog with id
    const existBlog = await this.prisma.blog.findFirst({
      where: {
        id: blogId,
        authorId,
      },
    });

    // 해당 id로 blog가 없을 때
    if (!existBlog)
      return new NotFoundException(
        `blog not found with id ${blogId} for this user`,
      );

    // delete comment
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return { msg: 'delete single comment' };
  }
}
