import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Next } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

export type rtPayload = {
  id: string;
  email: string;
  role: string;
  refreshToken: string;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: any): rtPayload {
    // refreshToken만 뽑아내기
    const refreshToken = request
      .get('Authorization')
      .replace('Bearer', '')
      .trim();

    const { id, email, role } = payload;
    return { id, email, role, refreshToken };
  }
}
