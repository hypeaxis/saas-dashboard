import type { Activity, ActivityType, Priority, Status, Task } from "src/types/task";

export const TASK_STATUS_LABELS: Record<Status, string> = {
    todo: "Todo",
    doing: "In Progress",
    done: "Done",
};

export const TASK_PRIORITY_LABELS: Record<Priority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
};

export const TASK_STATUS_BADGE_CLASSES: Record<Status, string> = {
    todo: "bg-surface-container-highest text-muted-foreground",
    doing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    done: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export const TASK_PRIORITY_BADGE_CLASSES: Record<Priority, string> = {
    low: "bg-surface-container-high text-muted-foreground",
    medium: "bg-primary/10 text-primary dark:bg-primary/20",
    high: "bg-destructive/10 text-destructive dark:bg-destructive/20",
};

export const TASK_STATUS_CHART_COLORS: Record<Status, string> = {
    todo: "#64748b",
    doing: "#2563eb",
    done: "#16a34a",
};

export const TASK_PRIORITY_CHART_COLORS: Record<Priority, string> = {
    low: "#10b981",
    medium: "#f59e0b",
    high: "#ef4444",
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
};

const DATE_TIME_FORMAT: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
};

const resolveDate = (dateStr?: string) => {
    if (!dateStr) {
        return null;
    }

    const date = new Date(dateStr);

    return Number.isNaN(date.getTime()) ? null : date;
};

export function formatTaskDate(dateStr?: string) {
    const date = resolveDate(dateStr);

    if (!date) {
        return "-";
    }

    return date.toLocaleDateString("en-US", DATE_FORMAT);
}

export function formatTaskDateTime(dateStr?: string) {
    const date = resolveDate(dateStr);

    if (!date) {
        return "-";
    }

    return date.toLocaleString("en-US", DATE_TIME_FORMAT);
}

export function createTaskActivity(type: ActivityType, task: Pick<Task, "id" | "title">, createdAt: string): Activity {
    const actionByType: Record<ActivityType, string> = {
        create: "Created",
        update: "Updated",
        delete: "Deleted",
    };

    return {
        id: `activity-${Date.now()}`,
        type,
        taskId: task.id,
        message: `${actionByType[type]} task ${task.title}`,
        createdAt,
    };
}
