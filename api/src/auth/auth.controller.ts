import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import {
  accessTokenType,
  googleTokenType,
  kakaoTokenType,
  naverTokenType,
  tokenType,
} from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PayloadType, rtPayload } from './strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // google login
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {}

  // google login redirect
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    const user = req.user as googleTokenType;

    const { email, firstName, lastName, picture, provider, accessToken } = user;

    const dto = {
      email,
      name: `${firstName} ${lastName}`,
      profile: picture,
      password: accessToken,
      provider: provider,
      role: 'USER',
    } as SignupDto;

    return this.authService.socialLogin(dto);
  }

  // kakao login ---------------------------------------------------------
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(): Promise<void> {}

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthRedirect(@Req() req: Request) {
    const user = req.user as kakaoTokenType;

    const { email, name, profile, provider, accessToken } = user;

    const dto = {
      email,
      name,
      profile,
      password: accessToken,
      provider: provider,
      role: 'USER',
    } as SignupDto;

    return this.authService.socialLogin(dto);
  }

  // naver login --------------------------------------------------------
  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(): Promise<void> {}

  @Get('naver/redirect')
  @UseGuards(AuthGuard('naver'))
  async naverAuthRedirect(@Req() req: Request) {
    const user = req.user as naverTokenType;

    const { email, name, profile, provider, accessToken } = user;

    const dto = {
      email,
      name,
      profile,
      password: accessToken,
      provider: provider,
      role: 'USER',
    } as SignupDto;

    return this.authService.socialLogin(dto);
  }

  // signup -------------------------------------------------------------
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: SignupDto): Promise<string> {
    return this.authService.signUp(dto);
  }

  // login --------------------------------------------------------------------

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): Promise<tokenType> {
    return this.authService.login(dto);
  }

  // logout
  @UseGuards(AuthGuard('jwt-access'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request): Promise<string> {
    const user = req.user as PayloadType;
    return this.authService.logout(user.id);
  }

  // refreshToken
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refreshToken')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request): Promise<accessTokenType> {
    // from strategy get req.user
    const user = req.user as rtPayload;

    // return to authService
    return this.authService.refreshToken(user);
  }
}
