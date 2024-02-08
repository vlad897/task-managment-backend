import z from "zod";

export const registration_validation_scheme: z.ZodType = z.object({
  name: z.string().trim().min(1),
  surname: z.string().trim().min(1),
  email: z.string().email(),
  password: z.string().trim().min(8)
});

export const login_validation_scheme: z.ZodType = z.object({
  email: z.string().email(),
  password: z.string().trim().min(8)
});

export const recover_account_validation_scheme: z.ZodType = z.object({
  email: z.string().email()
});

export const recover_account_secret_code_validation_scheme: z.ZodType = z.object({
  code: z.string().length(6)
});

export const new_password_validation_scheme: z.ZodType = z.object({
  new_password: z.string().trim().min(8),
  repeat_new_password: z.string().trim().min(8)
});
