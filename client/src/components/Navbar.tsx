"use client";

import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useUserInfo } from "@/hook";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui";
import { UserCircle2 } from "lucide-react";

export const Navbar = () => {
  const { userInfo, isLogin } = useUserInfo();

  // handleLogout
  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    window.location.reload();
  };

  return (
    <nav className="m-5 flex items-center justify-between">
      <div>
        <Link className="mr-5" href="/">
          Home
        </Link>
        <Link className="mr-3" href="/dashboard">
          Dashboard
        </Link>
      </div>

      <div className="flex items-center">
        {/* login state에 따른 buttons */}
        {isLogin ? (
          <>
            {userInfo?.profile ? (
              <img
                width={40}
                height={40}
                className="mr-3 rounded-full"
                src={userInfo?.profile}
                alt={userInfo?.name}
              />
            ) : (
              <UserCircle2 className="mr-3" />
            )}
            <div className="mr-3">{userInfo?.name}</div>
            <Link href="/" className="mr-3">
              <Button variant={"outline"} onClick={handleLogout}>
                Logout
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link className="mr-3" href="/login">
              <Button>Login</Button>
            </Link>
            <Link className="mr-3" href="/register">
              <Button variant={"secondary"}>Register</Button>
            </Link>
          </>
        )}

        {/* theme mode toggle button */}
        <ModeToggle />
      </div>
    </nav>
  );
};
