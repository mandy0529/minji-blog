export type tokenType = {
  access_token: string;
  refresh_token: string;
};

export type googleTokenType = {
  provider: 'google';
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
};

export type kakaoTokenType = {
  provider: 'kakao';
  name: string;
  profile: string;
  email: string;
  password: string;
  accessToken: string;
};

export type naverTokenType = {
  provider: 'naver';
  name: string;
  email: undefined;
  password: string;
  profile: string;
  id: string;
  accessToken: string;
};

export type accessTokenType = { access_token: string };
