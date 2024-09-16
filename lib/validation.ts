import { z } from "zod";

export const questionFormSchema = z.object({
  title: z.string().min(2).max(50),
  explanation: z.string().min(20),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
