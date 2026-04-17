import type { Activity, Task } from "src/types/task";
import type { TaskFormValues } from "src/lib/validations/task";
import { createTaskActivity } from "src/lib/task";

type TaskWriteResult = {
    tasks: Task[];
    activities: Activity[];
};

const buildNewTask = (values: TaskFormValues, now: string): Task => ({
    id: `task-${Date.now()}`,
    title: values.title,
    description: values.description,
    status: values.status,
    priority: values.priority,
    deadline: values.deadline,
    createdAt: now,
    updatedAt: now,
});

export function createTask(tasks: Task[], activities: Activity[], values: TaskFormValues, now = new Date().toISOString()): TaskWriteResult {
    const task = buildNewTask(values, now);
    const activity = createTaskActivity("create", task, now);

    return {
        tasks: [task, ...tasks],
        activities: [activity, ...activities],
    };
}

export function updateTask(
    tasks: Task[],
    activities: Activity[],
    taskId: string,
    values: TaskFormValues,
    now = new Date().toISOString()
): TaskWriteResult {
    const existingTask = tasks.find((task) => task.id === taskId);

    if (!existingTask) {
        return { tasks, activities };
    }

    const updatedTask: Task = {
        ...existingTask,
        ...values,
        updatedAt: now,
    };

    const activity = createTaskActivity("update", updatedTask, now);

    return {
        tasks: tasks.map((task) => (task.id === taskId ? updatedTask : task)),
        activities: [activity, ...activities],
    };
}

export function deleteTask(
    tasks: Task[],
    activities: Activity[],
    taskId: string,
    now = new Date().toISOString()
): TaskWriteResult {
    const taskToDelete = tasks.find((task) => task.id === taskId);

    if (!taskToDelete) {
        return { tasks, activities };
    }

    const activity = createTaskActivity("delete", taskToDelete, now);

    return {
        tasks: tasks.filter((task) => task.id !== taskId),
        activities: [activity, ...activities],
    };
}
