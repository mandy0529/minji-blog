export interface CreateBlogType {
  title: string;
  content: string;
  tag: string[];
}

export interface BlogType {
  id: number;
  title: string;
  content: string;
  tag: string[];
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: Author;
}

export interface Author {
  email: string;
  profile: string;
}

export type singleDataType = {
  author: {
    email: string;
    profile: string;
  };
  content: string;
  id: number;
  title: string;
  createdAt: Date;
  tag: string[];
};
