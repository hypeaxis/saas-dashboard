"use client";

import { Eye, Search, Trash } from "lucide-react";
import { PriorityBadge, StatusBadge } from "src/components/tasks/TaskBadges";
import { cn } from "src/lib/utils";
import { formatTaskDate } from "src/lib/task";
import type { Task } from "src/types/task";

type TaskTableProps = {
    tasks: Task[];
    onViewTask: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
};

export default function TaskTable({ tasks, onViewTask, onDeleteTask }: TaskTableProps) {
    return (
        <div className="surface-card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container-low/50">
                            <th className="px-6 py-4 label-sm text-muted-foreground">Title</th>
                            <th className="px-6 py-4 label-sm text-muted-foreground">Status</th>
                            <th className="px-6 py-4 label-sm text-muted-foreground">Priority</th>
                            <th className="px-6 py-4 label-sm text-muted-foreground">Deadline</th>
                            <th className="px-6 py-4 label-sm text-muted-foreground text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-surface-container-low/50 transition-colors group">
                                <td className="px-6 py-3 align-middle">
                                    <div className="flex items-center">
                                        <span
                                            className={cn(
                                                "text-sm font-medium text-foreground",
                                                task.status === "done" && "line-through opacity-70"
                                            )}
                                        >
                                            {task.title}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-6 py-3 align-middle">
                                    <StatusBadge status={task.status} />
                                </td>
                                <td className="px-6 py-3 align-middle">
                                    <PriorityBadge priority={task.priority} />
                                </td>
                                <td className="px-6 py-3 align-middle">
                                    <span
                                        className={cn(
                                            "text-sm",
                                            task.status === "done"
                                                ? "text-muted-foreground/50 line-through"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {formatTaskDate(task.deadline)}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-right align-middle">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            type="button"
                                            onClick={() => onViewTask(task.id)}
                                            aria-label={`View ${task.title}`}
                                            className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-surface-container-high"
                                        >
                                            <Eye className="size-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onDeleteTask(task.id)}
                                            aria-label={`Delete ${task.title}`}
                                            className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-surface-container-high"
                                        >
                                            <Trash className="size-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {tasks.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-sm text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search className="size-8 opacity-20" />
                                        <p>No tasks found matching your criteria.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
