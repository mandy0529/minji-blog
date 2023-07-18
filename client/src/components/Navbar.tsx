"use client";

import { makeRequest } from "@/api/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
async function getUser() {
  try {
    const result = await fetch("/api/auth/cookie", {
      cache: "no-store",
    });
    return {
      user: (await result.json()) as UserInfo,
      error: null,
    };
  } catch (e) {
    const error = e;

    return {
      user: null,
      error,
    };
  }
}

interface UserInfo {
  id: string;
  email: string;
  name: string;
  role: string;
}

const Navbar = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    name: "",
    role: "",
  });
  const userInit = async () => {
    const data = await getUser();

    const { user, error } = data;

    if (error || !user) {
      return;
    }

    const { id, email, name, role } = user;
    setUserInfo({
      id,
      email,
      name,
      role,
    });
  };

  const handleAccessToken = async () => {
    const data = await makeRequest.get("/user");
    console.log(data, "private data");
  };

  const isLogin = userInfo.id ? true : false;

  useEffect(() => {
    userInit();
  }, []);

  return (
    <nav className="m-5">
      <div className="flex">
        <Link className="mr-3" href="/">
          Home
        </Link>
        {isLogin ? (
          <div className="flex justify-between">
            <Link className="mr-10" href="/dashboard">
              Dashboard
            </Link>
            {/* <button
                type="button"
                className="bg-blue-500 p-3 mx-3"
                onClick={handleAccessToken}
              >
                accesstoken generate Click
              </button> */}
            <div className="bg-blue-600 p-3">
              <h6>LOGIN USER : {userInfo?.email}</h6>
              <h6>USER ROLE : {userInfo?.role}</h6>
            </div>
          </div>
        ) : (
          <>
            <Link className="mr-3" href="/login">
              Login
            </Link>
            <Link className="mr-3" href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
