import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: process.env.NAVER_REDIRECT,
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(profile, 'profile');

    const user = {
      provider: profile.provider,
      name: profile.displayName,
      email: profile._json.email,
      password: profile.id,
      profile: profile._json.profile_image,
      id: profile.id,
      accessToken,
    };

    return user;
  }
}
