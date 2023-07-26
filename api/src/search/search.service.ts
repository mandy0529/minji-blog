import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  // search by created-at
  async searchByCreatedAt(date: string) {
    const blogs = await this.prisma.blog.findMany({});

    return 'search by created-at';
  }

  // search by author
  async searchByAuthor(author: string) {
    const blogs = await this.prisma.blog.findMany({});

    return 'search by author';
  }

  // search by content or title
  async searchByContentOrTitle(keyword: string) {
    const blogs = await this.prisma.blog.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            content: {
              contains: keyword,
            },
          },
        ],
      },
    });
    return 'search by content or title';
  }

  // search by hashtags
  async searchByHashtag(keyword: string) {
    const blogs = await this.prisma.blog.findMany({});
    return 'search by hashtags';
  }
}
