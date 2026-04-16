"use client";

import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { activitiesAtom, tasksAtom, taskModalAtom } from "src/store/tasks";
import { Button } from "src/components/ui/button";
import type { Activity, Task, Status, Priority } from "src/types/task";

// 1. Zod Schema Validation
const taskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    description: z.string().optional(),
    status: z.enum(["todo", "doing", "done"]),
    priority: z.enum(["low", "medium", "high"]),
    deadline: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export default function TaskModal() {
    const [modalState, setModalState] = useAtom(taskModalAtom);
    const [tasks, setTasks] = useAtom(tasksAtom);
    const setActivities = useSetAtom(activitiesAtom);

    // Tìm task đang edit (nếu có)
    const editingTask = tasks.find((t) => t.id === modalState.editingTaskId);
    const isEditMode = !!editingTask;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "todo",
            priority: "medium",
            deadline: "",
        },
    });

    // Reset form mỗi khi Modal mở hoặc thay đổi task đang edit
    useEffect(() => {
        if (modalState.isOpen) {
            if (editingTask) {
                reset({
                    title: editingTask.title,
                    description: editingTask.description ?? "",
                    status: editingTask.status,
                    priority: editingTask.priority,
                    deadline: editingTask.deadline ?? "",
                });
            } else {
                reset({
                    title: "",
                    description: "",
                    status: "todo",
                    priority: "medium",
                    deadline: "",
                });
            }
        }
    }, [modalState.isOpen, editingTask, reset]);

    const closeModal = () => {
        setModalState({ isOpen: false, editingTaskId: null });
    };

    const addActivity = (activity: Activity) => {
        setActivities((prev) => [activity, ...prev]);
    };

    const onSubmit = (values: TaskFormValues) => {
        const now = new Date().toISOString();

        if (isEditMode && editingTask) {
            // Update existing task
            const updatedTask = {
                ...editingTask,
                ...values,
                status: values.status as Status,
                priority: values.priority as Priority,
                updatedAt: now,
            };

            setTasks((prev) =>
                prev.map((t) =>
                    t.id === editingTask.id ? updatedTask : t
                )
            );

            addActivity({
                id: `activity-${Date.now()}`,
                type: "update",
                taskId: editingTask.id,
                message: `Updated task ${updatedTask.title}`,
                createdAt: now,
            });
        } else {
            // Create new task
            const newTask: Task = {
                id: `task-${Date.now()}`,
                title: values.title,
                description: values.description,
                status: values.status as Status,
                priority: values.priority as Priority,
                deadline: values.deadline,
                createdAt: now,
                updatedAt: now,
            };
            // Thêm lên đầu danh sách
            setTasks((prev) => [newTask, ...prev]);

            addActivity({
                id: `activity-${Date.now()}`,
                type: "create",
                taskId: newTask.id,
                message: `Created task ${newTask.title}`,
                createdAt: now,
            });
        }

        // Đóng modal sau khi submit thành công
        closeModal();
    };

    if (!modalState.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4">
            {/* Modal Container */}
            <div className="w-full max-w-lg rounded-xl bg-surface-container-lowest shadow-[0px_24px_48px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-border/20">
                {/* Header */}
                <div className="p-6 border-b border-border/40 flex justify-between items-center">
                    <h2 className="headline-md font-semibold tracking-tight text-foreground">
                        {isEditMode ? "Edit Task" : "Create New Task"}
                    </h2>
                    <button 
                        onClick={closeModal}
                        className="p-1 text-muted-foreground hover:text-foreground hover:bg-surface-container-low rounded-md transition-colors"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="label-sm text-muted-foreground">Task Title *</label>
                        <input
                            type="text"
                            placeholder="e.g., Update system documentation"
                            className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-lg px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50"
                            {...register("title")}
                        />
                        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="label-sm text-muted-foreground">Description</label>
                        <textarea
                            rows={3}
                            placeholder="Provide more details about this task..."
                            className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-lg px-4 py-2.5 text-sm text-foreground outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                            {...register("description")}
                        />
                    </div>

                    {/* Status & Priority Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="label-sm text-muted-foreground">Status</label>
                            <select
                                className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-lg px-4 py-2.5 text-sm text-foreground outline-none cursor-pointer"
                                {...register("status")}
                            >
                                <option value="todo">To Do</option>
                                <option value="doing">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="label-sm text-muted-foreground">Priority</label>
                            <select
                                className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-lg px-4 py-2.5 text-sm text-foreground outline-none cursor-pointer"
                                {...register("priority")}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    {/* Deadline Picker */}
                    <div className="space-y-2">
                        <label className="label-sm text-muted-foreground">Deadline</label>
                        <input
                            type="date"
                            className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-lg px-4 py-2.5 text-sm text-foreground outline-none transition-all cursor-pointer"
                            {...register("deadline")}
                        />
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex justify-end gap-3 border-t border-border/40 mt-6">
                        <Button type="button" variant="ghost" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="submit" className="cta-gradient px-8 shadow-sm">
                            {isEditMode ? "Save Changes" : "Create Task"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}