import { z } from "zod";
import { TASK_PRIORITY_VALUES, TASK_STATUS_VALUES } from "src/types/task";

export const taskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    description: z.string().optional(),
    status: z.enum(TASK_STATUS_VALUES),
    priority: z.enum(TASK_PRIORITY_VALUES),
    deadline: z.string().optional().refine((value) => {
        if (!value) {
            return true;
        }

        return !Number.isNaN(Date.parse(value));
    }, "Invalid date format."),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
