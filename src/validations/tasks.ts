import z from "zod";

export const adding_task_scheme = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  deadline: z.string().trim().min(1).or(z.date())
});
