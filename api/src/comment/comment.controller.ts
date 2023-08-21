import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateCommentDto, EditCommentDto } from './dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // create comment --------------------------------------------------
  @UseGuards(AuthGuard('jwt-access'))
  @Post('blog/:id')
  @HttpCode(HttpStatus.CREATED)
  createComment(
    @Req() req: Request,
    @Body() dto: CreateCommentDto,
    @Param('id') blogId: number,
  ) {
    const user = req.user as { id: string };
    return this.commentService.createComment(user.id, Number(blogId), dto);
  }

  // get all comment --------------------------------------------------
  @Get()
  @HttpCode(HttpStatus.CREATED)
  getAllComment() {
    return this.commentService.getAllComment();
  }

  // get single comment --------------------------------------------------
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getSingleComment(@Param('id') commentId: number) {
    return this.commentService.getSingleComment(Number(commentId));
  }

  // edit single comment --------------------------------------------------
  @UseGuards(AuthGuard('jwt-access'))
  @Patch('/:id/blog/:blogId')
  @HttpCode(HttpStatus.OK)
  editSingleComment(
    @Req() req: Request,
    @Body() dto: EditCommentDto,
    @Param('blogId') blogId: number,
    @Param('id') commentId: number,
  ) {
    const user = req.user as { id: string };
    return this.commentService.editSingleComment(
      user.id,
      Number(commentId),
      Number(blogId),
      dto,
    );
  }

  // delete single comment --------------------------------------------------
  @UseGuards(AuthGuard('jwt-access'))
  @Delete('/:id/blog/:blogId')
  @HttpCode(HttpStatus.OK)
  deleteSingleComment(
    @Req() req: Request,
    @Param('blogId') blogId: number,
    @Param('id') commentId: number,
  ) {
    const user = req.user as { id: string };
    return this.commentService.deleteSingleComment(
      user.id,
      Number(commentId),
      Number(blogId),
    );
  }
}
