import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    id: "",
    email: "",
    name: "",
    profile: "",
  });

  // get user init
  const userInit = async () => {
    setLoading(true);
    const data = await getUser();
    setLoading(false);

    console.log(data, "data");

    const { user, error } = data;

    if (error || !user) {
      return;
    }

    // user있으면 destructuring
    const { id, email, name, profile } = user;

    // user state 정해주기
    setUserInfo({
      id,
      email,
      name: name ? name : email?.split("@")[0],
      profile,
    });
  };

  // pahtname에 따라 내 유저 정보 불러오기
  useEffect(() => {
    userInit();
  }, [pathname]);

  // isLogin state
  const isLogin = userInfo?.id ? true : false;

  return { userInfo, isLogin, loading };
}
