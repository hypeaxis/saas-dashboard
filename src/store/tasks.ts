import { atom } from "jotai";
import { seedActivities, seedTasks } from "src/lib/mock-seed";
import type { Activity, Status, Task } from "src/types/task";

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