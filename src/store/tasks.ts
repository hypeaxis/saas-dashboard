import { atom } from "jotai";
import { seedActivities, seedTasks } from "src/lib/mock-seed";
import type { Activity, Priority, Status, Task } from "src/types/task";

export type TaskFilter = "all" | Status;

export const tasksAtom = atom<Task[]>(seedTasks);

export const activitiesAtom = atom<Activity[]>(seedActivities);

export const filterAtom = atom<TaskFilter>("all");

export const searchAtom = atom<string>("");

export const filteredTasksAtom = atom((get) => {
    const tasks = get(tasksAtom);
    const filter = get(filterAtom);
    const search = get(searchAtom).trim().toLowerCase();

    return tasks.filter((task) => {
        const matchStatus = filter === "all" || task.status === filter;
        const matchSearch = task.title.toLowerCase().includes(search);

        return matchStatus && matchSearch;
    });
});

export const sidebarOpenAtom = atom<boolean>(false);

export type TaskModalState = {
    isOpen: boolean;
    editingTaskId: string | null;
};

export type TaskDetailsState = {
    isOpen: boolean;
    taskId: string | null;
};

export type DeleteConfirmState = {
    isOpen: boolean;
    taskId: string | null;
};

export type ActivityHistoryState = {
    isOpen: boolean;
    taskId: string | null;
};

export type TaskUiState = {
    taskModal: TaskModalState;
    taskDetail: TaskDetailsState;
    deleteConfirm: DeleteConfirmState;
    activityHistory: ActivityHistoryState;
};

const initialUiState: TaskUiState = {
    taskModal: {
        isOpen: false,
        editingTaskId: null,
    },
    taskDetail: {
        isOpen: false,
        taskId: null,
    },
    deleteConfirm: {
        isOpen: false,
        taskId: null,
    },
    activityHistory: {
        isOpen: false,
        taskId: null,
    },
};

export const uiStateAtom = atom<TaskUiState>(initialUiState);

export const taskModalAtom = atom(
    (get) => get(uiStateAtom).taskModal,
    (get, set, next: TaskModalState) => {
        set(uiStateAtom, {
            ...get(uiStateAtom),
            taskModal: next,
        });
    }
);

export const taskDetailAtom = atom(
    (get) => get(uiStateAtom).taskDetail,
    (get, set, next: TaskDetailsState) => {
        set(uiStateAtom, {
            ...get(uiStateAtom),
            taskDetail: next,
        });
    }
);

export const deleteConfirmAtom = atom(
    (get) => get(uiStateAtom).deleteConfirm,
    (get, set, next: DeleteConfirmState) => {
        set(uiStateAtom, {
            ...get(uiStateAtom),
            deleteConfirm: next,
        });
    }
);

export const activityHistoryAtom = atom(
    (get) => get(uiStateAtom).activityHistory,
    (get, set, next: ActivityHistoryState) => {
        set(uiStateAtom, {
            ...get(uiStateAtom),
            activityHistory: next,
        });
    }
);

export type PriorityCount = Record<Priority, number>;

export type StatusCount = Record<Status, number>;

export const priorityCountsAtom = atom<PriorityCount>((get) => {
    const tasks = get(tasksAtom);

    return tasks.reduce<PriorityCount>(
        (acc, task) => {
            acc[task.priority] += 1;
            return acc;
        },
        { low: 0, medium: 0, high: 0 }
    );
});

export const statusCountsAtom = atom<StatusCount>((get) => {
    const tasks = get(tasksAtom);

    return tasks.reduce<StatusCount>(
        (acc, task) => {
            acc[task.status] += 1;
            return acc;
        },
        { todo: 0, doing: 0, done: 0 }
    );
});

export const completionRateAtom = atom<number>((get) => {
    const tasks = get(tasksAtom);

    if (tasks.length === 0) {
        return 0;
    }

    const completed = tasks.filter((task) => task.status === "done").length;
    const rate = (completed / tasks.length) * 100;

    return Math.round(rate * 100) / 100;
});

