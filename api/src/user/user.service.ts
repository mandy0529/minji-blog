import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // get only my blog --------------------------------------------
  async getMyBlog(userId: string) {
    const blog = await this.prisma.blog.findMany({
      where: {
        authorId: userId,
      },
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

  // get my user -----------------------------------------------
  async getUser(userId) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    delete user.password;
    delete user.hashRefreshToken;
    return user;
  }
}
