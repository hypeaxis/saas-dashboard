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

export type PriorityCount = Record<Priority, number>;

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

export const completionRateAtom = atom<number>((get) => {
    const tasks = get(tasksAtom);

    if (tasks.length === 0) {
        return 0;
    }

    const completed = tasks.filter((task) => task.status === "done").length;
    const rate = (completed / tasks.length) * 100;

    return Math.round(rate * 100) / 100;
});

export type TaskModalState = {
    isOpen: boolean;
    editingTaskId: string | null;
};

export const taskModalAtom = atom<TaskModalState>({
    isOpen: false,
    editingTaskId: null,
});

export type DeleteConfirmState = {
    isOpen: boolean;
    taskId: string | null;
};

export const deleteConfirmAtom = atom<DeleteConfirmState>({
    isOpen: false,
    taskId: null,
});