# Minji-Blog

- development

```json
yarn start:dev
```

## 1. api

> 1.프로젝트 들어가기 전 Nest.js Basic Setting

1. **logger setting** - 우리의 api 쏘는 url, userAgent, ip 이런 정보 날려주기
2. **globalprefix** - api prefix 경로 고정시켜주기 **(/api/v1)**
3. **nest cli** - cli usages 참고해서 필요한 module, controller, service생성
4. **prisma** - prisma 사용하기 위한 구성
5. **controller, service**
6. **passport**
7. **validationPipe**
8. **configuration**

> 2.prisma 구성

- User, Blog 테이블 스키마로 구성

> 3.auth 구성

#### /api/v1/auth

- dto 구성
- accesstoken, refreshtoken, kakao, google, naver strategy 구성
- 필요한 types 구성
- social login 위한 각각 플랫폼의 developer 설정 필수

1. **signup user** @Post('signup')
2. **login user** @Post('login')
3. **logout user** @Post('logout') @UseGuards(AuthGuard('jwt-access'))
4. **create refreshtoken** @Post('refreshToken') @UseGuards(AuthGuard('jwt-refresh'))
5. **google login** @Get('google') @UseGuards(AuthGuard('google'))
6. **google login redirect** @Get('google/redirect') @UseGuards(AuthGuard('google'))
7. **kakao login** @Get('kakao') @UseGuards(AuthGuard('kakao'))
8. **kakao login redirect** @Get('kakao/redirect') @UseGuards(AuthGuard('kakao'))
9. **naver login** @Get('naver') @UseGuards(AuthGuard('naver'))
10. **naver login redirect** @Get('naver/redirect') @UseGuards(AuthGuard('naver'))

> 3. user 구성

#### /api/v1/user

- protected routing 구성 위한 controller 구성
- 보호 받아야할 아이만 access strategy 추가

1. **Get my user** @Get('') @UseGuards(AuthGuard('jwt-access'))
2. **Get public all users** @Get('pub')

> 4.  blog 구성

#### /api/v1/blog

- protected routing 구성 위한 controller 구성
- 보호 받아야할 아이만 access strategy 추가

1. **Create Blog** @Post('') @UseGuards(AuthGuard('jwt-access'))
2. **Get all Blog** @Get('')
3. **Get Single Blog** @Get(':id') @UseGuards(AuthGuard('jwt-access'))
4. **Edit Blog**@Edit(':id') @UseGuards(AuthGuard('jwt-access'))
5. **Delete Blog** @Delete(':id') @UseGuards(AuthGuard('jwt-access'))

<hr/>

## 2. client

- development

```json
yarn dev
```

> 1.backend에서 받은 token을 cookie에 저장

- login 하는 페이지에서 라이브러리 이용해서 token들 cookie에 저장
- next.js server로 나의 cookie를 가져오는 api 생성 (use server)
- 해당 token이 존재하지 않을 때에는 204 status
- 토큰이 유효하지 않거나, 이상할때 400 status
- 토큰이 유효하면 내 유저 200 status와 함께 반환

> 2.protected routing 사용해야하는 페이지 구성

- 해당 next.js api fetch
- user state값에 담아서
- 로그인 되었을때 페이지 구성,
- 로그인 안 되었을때 페이지 구성 따로 코드 작성

> 3.axios interceptor for generate accesstoken with refreshtoken

- axios interceptor를 이용해 accesstoken이 만료되었지만, Refreshtoken이 살아있을때 refreshtoken post요청을통해 계속 accesstoken재발급하게끔 Interceptor 로직 구현
  참고 링크 : <https://dev.to/mihaiandrei97/jwt-authentication-using-axios-interceptors-55be>

> 4.social login page 구성

- callback url에서 로그인 처리하고,
- redirection url에서 로그인 중인 컴포넌트 하나 생성해서 거기서 page reload를 통해 login, logout 구현

```

```
