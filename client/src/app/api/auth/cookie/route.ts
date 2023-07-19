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
  const { value } = token;

  if (value) {
    const user = jwt.verify(value, process.env.NEXT_PUBLIC_JWT_SECRET);
    console.log(user, "nextserver user@@");

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } else {
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
