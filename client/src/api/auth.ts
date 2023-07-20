// user api

import { makeRequest } from "./axios";
import { loginType, signupType } from "@/app/types";

export const authAPI = {
  // signup
  signup: async (payload: signupType) => {
    const { data } = await makeRequest.post("/auth/signup", payload);
    return data;
  },

  // login
  login: async (payload: loginType) => {
    const { data } = await makeRequest.post("/auth/login", payload);
    return data;
  },
};
