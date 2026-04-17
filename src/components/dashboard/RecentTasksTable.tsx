"use client";

import Link from "next/link";
import { PriorityBadge, StatusBadge } from "src/components/tasks/TaskBadges";
import { cn } from "src/lib/utils";
import { formatTaskDate } from "src/lib/task";
import type { Task } from "src/types/task";

type RecentTasksTableProps = {
    tasks: Task[];
};

export default function RecentTasksTable({ tasks }: RecentTasksTableProps) {
    return (
        <div className="lg:col-span-8 surface-card flex flex-col overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-border/40">
                <h3 className="title-sm font-semibold">Recent Tasks</h3>
                <Link href="/tasks" className="text-sm font-medium text-primary hover:underline">
                    View All
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-surface-container-low/50">
                            <th className="px-6 py-4 label-sm text-muted-foreground">Title</th>
                            <th className="px-6 py-4 label-sm text-muted-foreground">Status</th>
                            <th className="px-6 py-4 label-sm text-muted-foreground">Priority</th>
                            <th className="px-6 py-4 label-sm text-muted-foreground">Deadline</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-surface-container-low/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "w-2 h-2 rounded-full",
                                                task.status === "done"
                                                    ? "bg-emerald-500"
                                                    : task.status === "doing"
                                                        ? "bg-primary"
                                                        : "bg-muted-foreground"
                                            )}
                                        />
                                        <span className="text-sm font-medium">{task.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={task.status} />
                                </td>
                                <td className="px-6 py-4">
                                    <PriorityBadge priority={task.priority} />
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {formatTaskDate(task.deadline)}
                                </td>
                            </tr>
                        ))}
                        {tasks.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-sm text-muted-foreground">
                                    No recent tasks found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
