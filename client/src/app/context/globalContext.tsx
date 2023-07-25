"use client";

import { setCookie } from "cookies-next";
import { createContext, useContext, useState, useEffect } from "react";

export interface UserInfoType {
  id?: string;
  email: string;
  name?: string;
  profile: string;
}

interface UserInfoContextType {
  userInfo: UserInfoType;
  isLogin: boolean;
  loading: boolean;
}

const GlobalContext = createContext<UserInfoContextType>(
  {} as UserInfoContextType
);

//   get user function
async function getUser() {
  try {
    const response = await fetch("/api/auth/cookie", {
      cache: "no-store",
    });
    const data = await response.json();

    // accesstoken 만료 되서, 새로 발급받은 accesstoken 새로 갈아끼우고, return user
    if (data.result) {
      if (data.result.access_token) {
        setCookie("accessToken", data.result.access_token);
        return {
          user: data.result.user as UserInfoType,
          error: null,
        };
      }
    }

    // 로그인 처음 했을떄 user return
    return {
      user: data as UserInfoType,
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

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
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

  useEffect(() => {
    userInit();
  }, []);

  const isLogin = userInfo?.id ? true : false;

  return (
    <GlobalContext.Provider value={{ userInfo, isLogin, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalContextProvider;
