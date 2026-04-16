export type Status = "todo" | "doing" | "done";

export type Priority = "low" | "medium" | "high";

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    deadline?: string;
    createdAt: string;
    updatedAt: string;
};

export type ActivityType = "create" | "update" | "delete";

export type Activity = {
    id: string;
    type: ActivityType;
    taskId: string;
    message: string;
    createdAt: string;
};