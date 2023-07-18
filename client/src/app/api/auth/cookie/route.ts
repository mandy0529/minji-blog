import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // cookie setting
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  // token 없을때 401 Unauthorized error
  if (!token) return NextResponse.json({ message: "no user" }, { status: 401 });

  const { value } = token;

  // jwt verify if token is valid or not
  if (value) {
    const user = jwt.verify(value, "os4O91fJW8WzpBkbrQqpcNHdBTMEL4C6");
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
