import { z } from "zod";

export const blogValidator = z.object({
  title: z.string(),
  content: z.string().max(3000, "Content must be less than 3000 characters"),
  tag: z.string(),
});
