import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui";
import Link from "next/link";
import { deleteCookie } from "cookies-next";

import UserAvatar from "./UserAvatar";
import { UserInfoType } from "@/hook";
import { FC } from "react";

interface userAccountNavType {
  user: UserInfoType;
}

export const UserAccountNav: FC<userAccountNavType> = ({ user }) => {
  // handleLogout
  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar className="h-8 w-8" user={user} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user?.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/blog">Blog Feed</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/create/blog">Create Blog</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
