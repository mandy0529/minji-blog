// user api
import { makeRequest } from "./axios";

const baseURL = "/user";

export const userAPI = {
  // get my blog
  getMyBlog: async () => {
    const { data } = await makeRequest.get(`${baseURL}/blog`);
    return data;
  },
};
