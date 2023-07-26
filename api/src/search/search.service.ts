import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}
  // search result by field
  async searchByField(keyword: string, field: string) {
    let where = {};

    if (field === 'author') {
      where = {
        author: {
          email: {
            contains: keyword,
          },
        },
      };
    } else if (field === 'title') {
      where = {
        title: {
          contains: keyword,
        },
      };
    } else if (field === 'content') {
      where = {
        content: {
          contains: keyword,
        },
      };
    } else if (field === 'tag') {
      where = {
        tag: {
          hasSome: `#${keyword}`,
        },
      };
    }
    return await this.prisma.blog.findMany({
      where,
    });
  }

  //   search all query
  async searchAll(keyword: string) {
    return await this.prisma.blog.findMany({
      where: {
        OR: [
          {
            author: {
              email: {
                contains: keyword,
              },
            },
          },
          { title: { contains: keyword } },
          { content: { contains: keyword } },
          { tag: { hasSome: `#${keyword}` } },
        ],
      },
    });
  }
}
