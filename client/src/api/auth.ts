// user api
import axios from "axios";
import { makeRequest } from "./axios";

type payloadType = {
  email: string;
  password: string;
};

export const authAPI = {
  login: async (payload: payloadType) => {
    const { data } = await makeRequest.post("/auth/login", payload);
    return data;
  },
};
