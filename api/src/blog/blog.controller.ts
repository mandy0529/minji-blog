import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { EditBlogDto } from './dto';
import { Request } from 'express';
import { blogType } from './types';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  // create blog
  @UseGuards(AuthGuard('jwt-access'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBlog(@Req() req: Request, @Body() dto: CreateBlogDto): Promise<string> {
    const user = req.user as { id: string };
    return this.blogService.createBlog(user.id, dto);
  }

  // get all blog
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllBlog() {
    return this.blogService.getAllBlog();
  }

  // get single blog
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getSingleBlog(@Param('id') blogId: number) {
    return this.blogService.getSingleBlog(Number(blogId));
  }

  // edit single blog
  @UseGuards(AuthGuard('jwt-access'))
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  editSingleBlog(
    @Req() req: Request,
    @Param('id') blogId: number,
    @Body() dto: EditBlogDto,
  ): Promise<NotFoundException | string> {
    const user = req.user as { id: string };
    return this.blogService.editBlog(user.id, Number(blogId), dto);
  }

  // delete single blog
  @UseGuards(AuthGuard('jwt-access'))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteBlog(@Req() req: Request, @Param('id') blogId: number) {
    const user = req.user as { id: string };
    return this.blogService.deleteBlog(user.id, Number(blogId));
  }
}
