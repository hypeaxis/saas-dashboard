export const TASK_STATUS_VALUES = ["todo", "doing", "done"] as const;

export type Status = (typeof TASK_STATUS_VALUES)[number];

export const TASK_PRIORITY_VALUES = ["low", "medium", "high"] as const;

export type Priority = (typeof TASK_PRIORITY_VALUES)[number];

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

export const ACTIVITY_TYPE_VALUES = ["create", "update", "delete"] as const;

export type ActivityType = (typeof ACTIVITY_TYPE_VALUES)[number];

export type Activity = {
    id: string;
    type: ActivityType;
    taskId: string;
    message: string;
    createdAt: string;
};