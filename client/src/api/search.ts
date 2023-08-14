// search api

import { makeRequest } from "./axios";

const baseURL = "/search";

export const searchAPI = {
  // search all blog
  searchAllBlog: async (keyword: string) => {
    const { data } = await makeRequest.get(`${baseURL}?keyword=${keyword}`);
    return data;
  },
};
