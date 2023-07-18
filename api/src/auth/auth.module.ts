import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import {
  AccessTokenStrategy,
  GoogleStrategy,
  KakaoStrategy,
  NaverStrategy,
  RefreshTokenStrategy,
} from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
    KakaoStrategy,
    NaverStrategy,
  ],
})
export class AuthModule {}
