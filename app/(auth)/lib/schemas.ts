import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .max(16, "No more than 16 characters"),
});

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .max(16, "No more than 16 characters"),
    confirmPassword: z
      .string()
      .min(8, "At least 8 characters")
      .max(16, "No more than 16 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export const emailVerificationTokenSchema = z.object({
  email: z.string().email(),
});
