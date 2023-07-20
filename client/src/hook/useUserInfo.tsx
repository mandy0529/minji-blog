import { useEffect, useState } from "react";

interface UserInfoType {
  id: string;
  email: string;
  name: string;
  profile: string;
}
async function getUser() {
  try {
    const result = await fetch("/api/auth/cookie", {
      cache: "no-store",
    });
    return {
      user: (await result.json()) as UserInfoType,
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

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    id: "",
    email: "",
    name: "",
    profile: "",
  });

  // get user init
  const userInit = async () => {
    const data = await getUser();

    const { user, error } = data;

    if (error || !user) {
      return;
    }

    if (!user) return;
    const { id, email, name, profile } = user;

    setUserInfo({
      id,
      email,
      name: name ? name : email?.split("@")[0],
      profile,
    });
  };

  useEffect(() => {
    userInit();
  }, []);

  // isLogin state
  const isLogin = userInfo?.id ? true : false;

  return { userInfo, isLogin };
}
