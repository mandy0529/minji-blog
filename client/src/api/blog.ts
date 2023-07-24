// user api

import { CreateBlogType } from "@/app/types";
import { makeRequest } from "./axios";

const baseURL = "/blog";

export const blogAPI = {
  // create blog
  createBlog: async (payload: CreateBlogType) => {
    const { data } = await makeRequest.post(`${baseURL}`, payload);
    return data;
  },

  // get all blogs
  getAllBlogs: async () => {
    const { data } = await makeRequest.get(`${baseURL}`);
    return data;
  },

  // get single blog
  getSingleBlog: async (id: number) => {
    const { data } = await makeRequest.get(`${baseURL}/${id}`);
    return data;
  },

  // edit single blog
  editSingleBlog: async (id: number, payload: any) => {
    const { data } = await makeRequest.put(`${baseURL}/${id}`, payload);
    return data;
  },

  // delete single blog
  deleteSingleBlog: async (id: number, payload: any) => {
    const { data } = await makeRequest.delete(`${baseURL}/${id}`, payload);
    return data;
  },
};
