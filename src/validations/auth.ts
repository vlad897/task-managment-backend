import z from "zod";

export const registration_validation_scheme: z.ZodType = z.object({
  name: z.string().trim().min(1),
  surname: z.string().trim().min(1),
  email: z.string().email(),
  password: z.string().trim().min(8)
});
