"use client";

import { makeRequest } from "@/api/axios";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useUserInfo } from "@/hook";

export const Navbar = () => {
  const { userInfo, isLogin } = useUserInfo();

  // handleAccTokenGenerate
  const handleAccessToken = async () => {
    const data = await makeRequest.get("/user");
    console.log(data, "private data");
  };

  // handleLogout
  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    window.location.reload();
  };

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
            <Link href="/" onClick={handleLogout}>
              Logout
            </Link>
            {/* <button
                type="button"
                className="bg-blue-500 p-3 mx-3"
                onClick={handleAccessToken}
              >
                accesstoken generate Click
              </button> */}
            <div className="bg-blue-600 p-3 mx-5">
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
