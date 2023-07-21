import * as z from "zod";

// signup
export const SignupValidator = z.object({
  email: z.string().email({ message: "must be a vaild email." }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string(),
  name: z.string(),
});

// login
export const loginValidator = z.object({
  email: z.string().email({ message: "must be a vaild email." }),
  password: z.string(),
});
