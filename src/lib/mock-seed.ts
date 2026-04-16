import type { Activity, Task } from "src/types/task";

const now = new Date().toISOString();

export const seedTasks: Task[] = [
    {
        id: "task-1",
        title: "Finalize Q2 dashboard objectives",
        description: "Align KPIs with product and growth teams.",
        status: "doing",
        priority: "high",
        deadline: "2026-04-14",
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "task-2",
        title: "Write onboarding checklist for new analysts",
        status: "todo",
        priority: "medium",
        deadline: "2026-04-18",
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "task-3",
        title: "Audit stale tickets in operations board",
        status: "done",
        priority: "low",
        deadline: "2026-04-08",
        createdAt: now,
        updatedAt: now,
    },
];

export const seedActivities: Activity[] = [
    {
        id: "activity-1",
        type: "create",
        taskId: "task-1",
        message: "Created task Finalize Q2 dashboard objectives",
        createdAt: now,
    },
    {
        id: "activity-2",
        type: "update",
        taskId: "task-3",
        message: "Moved Audit stale tickets in operations board to Done",
        createdAt: now,
    },
];