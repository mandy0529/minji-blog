import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // cookie setting
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  // token 없을때 401 Unauthorized error
  if (!token) return new Response(null, { status: 204 });

  // jwt verify if token is valid or not
  try {
    const { value } = token;
    // @ts-ignore
    const user = jwt.verify(value, process.env.NEXT_PUBLIC_JWT_SECRET);

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      // tokenExpiredError일떄 refreshToken api쳐주기
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        // cookie에서 나의 refreshToeken 얻기
        const token = cookieStore.get("refreshToken");

        // refreshToken api 치기
        const response = await fetch(
          "http://127.0.0.1:3333/api/v1/auth/refreshToken",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          }
        );
        const { access_token } = await response.json();

        // jwt verify with access_token
        const user = jwt.verify(
          access_token,
          // @ts-ignore
          process.env.NEXT_PUBLIC_JWT_SECRET
        );

        // 옳으면 result에 내 유저 담아서 보내기
        return NextResponse.json(
          {
            result: {
              user,
              access_token,
            },
          },
          {
            status: 200,
          }
        );
      }
    }
    // 뭔가 그냥 잘못되었을때
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}
