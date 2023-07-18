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
    console.log(user, "user@@@@");

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
  const handlePubic = async () => {
    const { data } = await makeRequest.get("/user/pub");
    console.log(data, "public data");
  };

  const isLogin = userInfo.id ? true : false;

  useEffect(() => {
    userInit();
  }, []);

  return (
    <div>
      <nav>
        <div className="flex">
          <Link className="mr-3" href="/">
            Home
          </Link>
          {isLogin ? (
            <div className="flex justify-between">
              <Link className="mr-10" href="/dashboard">
                Dashboard
              </Link>
              <button className="bg-red-500" onClick={handleAccessToken}>
                accesstoken generate Click
              </button>
              <div>
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

              <div>
                <button className="bg-blue-500" onClick={handlePubic}>
                  public Click
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
