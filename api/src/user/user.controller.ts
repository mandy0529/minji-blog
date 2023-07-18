import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get()
  @HttpCode(HttpStatus.OK)
  getUser(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.userService.getUser(user.id);
  }

  @Get('pub')
  @HttpCode(HttpStatus.OK)
  getPub(): string {
    return 'get  public';
  }
}
