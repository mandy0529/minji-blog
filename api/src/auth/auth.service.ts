import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  tokenType,
  accessTokenType,
  googleTokenType,
  kakaoTokenType,
  naverTokenType,
} from './types';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { LoginDto, SignupDto } from './dto';
import { rtPayload } from './strategy';
import { PrismaService } from '../prisma/prisma.service';
import { access } from 'fs';
import { create } from 'domain';

// --------------------------------------------------------------

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  // google login
  async googleLogin(dto: SignupDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // google로그인한 user가 내 db에 없을때 새로 생성
    if (!existUser) {
      const newUser = await this.prisma.user.create({
        data: {
          ...dto,
        },
      });

      // google 로그인한 user가 내 db에 있을떄 바로 login시켜서 return access_token
      // jwt payload prepare
      const payload = {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
      };

      // generate token
      const token = await this.createToken(payload);

      // update prisma with one more hash refresh_token
      await this.updateRefreshToken(newUser.id, token.refresh_token);

      // return token
      return token;
    }

    // google로그인한 user가 내 db에 있을때 바로 login으로
    // jwt payload prepare
    const payload = {
      id: existUser.id,
      email: existUser.email,
      role: existUser.role,
    };

    // generate token
    const token = await this.createToken(payload);

    // update prisma with one more hash refresh_token
    await this.updateRefreshToken(existUser.id, token.refresh_token);

    // return token
    return token;
  }

  // kakao login
  kakaoLogin(user: kakaoTokenType): kakaoTokenType {
    return user;
  }
  // naver login
  naverLogin(user: naverTokenType): naverTokenType {
    return user;
  }

  // signup
  async signUp(dto: SignupDto): Promise<string> {
    try {
      // password hash
      const hashPassword = await this.hashData(dto.password);

      // create new user to prisma
      await this.prisma.user.create({
        data: {
          ...dto,
          password: hashPassword,
        },
      });

      return 'user has been created successfully';
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken. Try again');
        }
        throw new ForbiddenException('Something went wrong', error.code);
      }
    }
  }

  // login
  async login(dto: LoginDto): Promise<tokenType> {
    // prisma에서 email로 내 user 찾기
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // 내 유저 없을 때
    if (!existUser) throw new ForbiddenException('Access denied');

    // compare password with bcrypt
    const isPasswordMatching = await bcrypt.compareSync(
      dto.password,
      existUser.password,
    );

    // not match password
    if (!isPasswordMatching) throw new ForbiddenException('Access denied');

    // jwt payload prepare
    const payload = {
      id: existUser.id,
      email: existUser.email,
      role: existUser.role,
    };

    // generate token
    const token = await this.createToken(payload);

    // update prisma with one more hash refresh_token
    await this.updateRefreshToken(existUser.id, token.refresh_token);

    // return token
    return token;
  }

  // logout
  async logout(userId): Promise<string> {
    // 내 user찾아 refreshToken null값으로 만들기
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRefreshToken: null,
      },
    });
    return 'user has been logged out successfully';
  }

  // refreshToken
  async refreshToken(user: rtPayload): Promise<accessTokenType> {
    // 내 유저 찾기
    const existUser = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    // 내 유저가 없을때
    if (!existUser) throw new ForbiddenException('Access denied');

    // refreshToken hash compare
    const isPasswordMatching = await bcrypt.compareSync(
      user.refreshToken,
      existUser.hashRefreshToken,
    );

    // // not match refreshTokenHash
    if (!isPasswordMatching) throw new ForbiddenException('Access denied');

    // all success, get create token for access_token

    // jwt payload prepare
    const payload = {
      id: existUser.id,
      email: existUser.email,
      role: existUser.role,
    };

    const access_token = await this.createAccessToken(payload);
    return { access_token };
  }

  //--------------------------------------------------------

  // create access token
  async createAccessToken(payload) {
    return await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  // create token
  async createToken(payload) {
    // generate jwt
    const [access_token, refresh_token] = await Promise.all([
      // access_token
      this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: process.env.JWT_ACCESS_SECRET,
      }),
      // refresh_token
      this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    ]);

    // return tokens
    return { access_token, refresh_token };
  }

  //  hash token
  async hashData(payload) {
    const saltOrRounds = 10;
    return bcrypt.hashSync(payload, saltOrRounds);
  }

  //  update refresh_token
  async updateRefreshToken(id, refreshToken) {
    // one more hash refreshToken
    const hashRefreshToken = await this.hashData(refreshToken);

    // update refresh_token
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashRefreshToken,
      },
    });
  }
}
