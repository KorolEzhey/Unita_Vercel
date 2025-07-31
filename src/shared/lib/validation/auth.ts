import { z } from "zod";

export const loginFormSchema = z.object({
    login: z.string().min(1, "errors.emptyFields").trim(),
    password: z.string().min(1, "errors.emptyFields").trim(),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
