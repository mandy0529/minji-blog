import { FC } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui";

import { UserInfoType } from "@/hook";
import { AvatarProps } from "@radix-ui/react-avatar";

import { User } from "lucide-react";

interface userAvatarProps extends AvatarProps {
  user: UserInfoType;
}

const UserAvatar: FC<userAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user?.profile ? (
        <div className="relative aspect-square h-full w-full">
          <img
            src={user.profile}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <User className="h-[1.2rem] w-[1.2rem]" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
