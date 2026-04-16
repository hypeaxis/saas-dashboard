"use client";

import React from "react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { tasksAtom, taskDetailAtom, taskModalAtom } from "src/store/tasks";
import { cn } from "src/lib/utils";
import { X, Calendar, Clock, Hash, AlignLeft, Activity, Flag } from "lucide-react";
import { Button } from "shadcn/button";

const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });
};

const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });
};

export default function TaskDetailModal() {
    const [detailState, setDetailState] = useAtom(taskDetailAtom);
    const setTaskModal = useSetAtom(taskModalAtom);
    const tasks = useAtomValue(tasksAtom);

    const task = tasks.find((t) => t.id === detailState.taskId);

    const closeModal = () => {
        setDetailState({ isOpen: false, taskId: null });
    };

    const handleEdit = () => {
        if (task) {
            closeModal();
            setTaskModal({ isOpen: true, editingTaskId: task.id });
        }
    };

    if (!detailState.isOpen || !task) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-xl bg-surface-container-lowest shadow-2xl overflow-hidden border border-border/20">
                {/* Header */}
                <div className="p-6 border-b border-border/40 flex justify-between items-start gap-4 bg-surface-container-low/30">
                    <div>
                        <h2 className="headline-md font-semibold tracking-tight text-foreground">
                            {task.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <Hash className="size-3.5" />
                            <span>{task.id}</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface-container-high rounded-md transition-colors shrink-0"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Status & Priority */}
                    <div className="flex flex-wrap gap-6">
                        <div className="space-y-1.5">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                <Activity className="size-3.5" /> Status
                            </span>
                            <div className="text-sm font-semibold uppercase tracking-wide text-foreground">
                                {task.status === "todo" ? "To Do" : task.status === "doing" ? "In Progress" : "Done"}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                <Flag className="size-3.5" /> Priority
                            </span>
                            <div className="text-sm font-semibold capitalize text-foreground">
                                {task.priority}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                            <AlignLeft className="size-3.5" /> Description
                        </span>
                        <div className="bg-surface-container-low p-4 rounded-lg text-sm text-foreground leading-relaxed whitespace-pre-wrap min-h-[80px]">
                            {task.description || "No description provided."}
                        </div>
                    </div>

                    {/* Timestamps Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-surface-container-low/50 border border-border/40">
                        <div className="space-y-1">
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="size-3" /> Created At
                            </span>
                            <div className="text-sm font-medium">{formatDateTime(task.createdAt)}</div>
                        </div>
                        <div className="space-y-1">
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="size-3" /> Updated At
                            </span>
                            <div className="text-sm font-medium">{formatDateTime(task.updatedAt)}</div>
                        </div>
                        <div className="space-y-1">
                            <span className="flex items-center gap-1.5 text-xs text-destructive">
                                <Calendar className="size-3" /> Deadline
                            </span>
                            <div className="text-sm font-medium text-destructive">{formatDate(task.deadline)}</div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={closeModal}>
                        Close
                    </Button>
                    <Button type="button" onClick={handleEdit} className="cta-gradient px-8">
                        Edit Task
                    </Button>
                </div>
            </div>
        </div>
    );
}