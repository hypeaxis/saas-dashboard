"use client";

import { useAtom, useSetAtom } from "jotai";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "src/components/ui/button";
import { activitiesAtom, deleteConfirmAtom, tasksAtom } from "src/store/tasks";
import type { Activity } from "src/types/task";

export default function DeleteConfirmModal() {
    const [deleteState, setDeleteState] = useAtom(deleteConfirmAtom);
    const [tasks, setTasks] = useAtom(tasksAtom);
    const setActivities = useSetAtom(activitiesAtom);

    const taskToDelete = tasks.find((task) => task.id === deleteState.taskId);

    const closeModal = () => {
        setDeleteState({ isOpen: false, taskId: null });
    };

    const handleConfirmDelete = () => {
        if (!deleteState.taskId) {
            closeModal();
            return;
        }

        const now = new Date().toISOString();
        const taskSnapshot = taskToDelete;

        setTasks((prev) => prev.filter((task) => task.id !== deleteState.taskId));

        if (taskSnapshot) {
            const activity: Activity = {
                id: `activity-${Date.now()}`,
                type: "delete",
                taskId: taskSnapshot.id,
                message: `Deleted task ${taskSnapshot.title}`,
                createdAt: now,
            };

            setActivities((prev) => [activity, ...prev]);
        }

        closeModal();
    };

    if (!deleteState.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-xl bg-surface-container-lowest shadow-[0px_24px_48px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-border/20">
                <div className="p-6 border-b border-border/40 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                            <AlertTriangle className="size-5" />
                        </div>
                        <div>
                            <h2 className="headline-md font-semibold tracking-tight text-foreground">
                                Delete Task
                            </h2>
                            <p className="body-sm text-muted-foreground">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="p-1 text-muted-foreground hover:text-foreground hover:bg-surface-container-low rounded-md transition-colors"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {taskToDelete
                            ? <>Are you sure you want to delete <span className="font-semibold text-foreground">{taskToDelete.title}</span>?</>
                            : "Are you sure you want to delete this task?"}
                    </p>

                    <div className="pt-4 flex justify-end gap-3 border-t border-border/40 mt-6">
                        <Button type="button" variant="ghost" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="button" onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-8 shadow-sm">
                            Delete Task
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}