"use client";

import Link from "next/link";
import { useUserInfo } from "@/hook";
import { Button } from "../ui";
import { UserAccountNav } from "./UserAccountNav";
import { HomeSvg } from "../icon";
import UserAvatar from "./UserAvatar";

export const Navbar = () => {
  // useUserInfo hook
  const { userInfo, isLogin, loading } = useUserInfo();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-3">
      <div className="container max-w-8xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <HomeSvg width="30" height="30" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Minji Blog
          </p>
        </Link>

        {/* search bar */}
        {/* <SearchBar /> */}

        {/* isLogin & loading상태에 따른 navbar 구현 */}
        <div className="flex items-center">
          {loading ? (
            <UserAvatar className="h-8 w-8" user={userInfo} />
          ) : isLogin ? (
            <UserAccountNav user={userInfo} />
          ) : (
            <>
              <Link className="mr-3" href="/login">
                <Button className="">Login</Button>
              </Link>
              <Link className="mr-3" href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="flex items-center">
          {loading ? (
            <NavSkeleton />
          ) : isLogin ? (
            <UserAccountNav user={userInfo} loading={loading} />
          ) : (
            <>
              <Link className="mr-3" href="/login">
                <Button className="">Login</Button>
              </Link>
              <Link className="mr-3" href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div> */
}
