import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: process.env.KAKAO_REDIRECT,
      scope: ['account_email', 'profile_nickname', 'profile_image'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = {
      provider: profile.provider,
      name: profile.displayName,
      profile: profile._json.properties.thumbnail_image,
      email: profile._json.kakao_account.email,
      password: profile.id,
      accessToken,
    };
    return user;
  }
}
