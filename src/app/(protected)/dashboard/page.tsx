"use client";

import { useAtomValue } from "jotai";
import Link from "next/link";
import {
    ListTodo,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Edit2,
    PlusCircle,
    Trash
} from "lucide-react";

import { activitiesAtom, tasksAtom } from "src/store/tasks";
import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import type { Priority, Status } from "src/types/task";

// Helper định dạng ngày tháng
const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

// Component UI hiển thị Status
const StatusBadge = ({ status }: { status: Status }) => {
    const config = {
        todo: { label: "Todo", className: "bg-surface-container-highest text-muted-foreground" },
        doing: { label: "In Progress", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
        done: { label: "Completed", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
    };
    const { label, className } = config[status];
    return (
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide", className)}>
            {label}
        </span>
    );
};

// Component UI hiển thị Priority
const PriorityBadge = ({ priority }: { priority: Priority }) => {
    const config = {
        low: "bg-surface-container-high text-secondary",
        medium: "bg-secondary-container text-foreground",
        high: "bg-destructive/10 text-destructive dark:bg-destructive/20",
    };
    return (
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide", config[priority])}>
            {priority}
        </span>
    );
};

export default function DashboardPage() {
    // Đọc dữ liệu tasks từ Jotai
    const tasks = useAtomValue(tasksAtom);
    const activities = useAtomValue(activitiesAtom);

    // Tính toán các chỉ số KPI
    const total = tasks.length;
    const doing = tasks.filter((t) => t.status === "doing").length;
    const done = tasks.filter((t) => t.status === "done").length;
    const overdue = tasks.filter((t) => {
        if (t.status === "done" || !t.deadline) return false;
        return new Date(t.deadline).getTime() < new Date().getTime();
    }).length;

    // Lấy 4 task mới nhất
    const recentTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);

    return (
        <div className="space-y-8 max-w-[1280px]">
            {/* Header */}
            <div>
                <p className="label-sm text-tertiary">Overview</p>
                <h1 className="headline-md mt-1">Dashboard</h1>
            </div>

            {/* KPI Cards (Bento Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="surface-card p-6 hover:-translate-y-0.5 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <ListTodo className="size-5" />
                        </div>
                    </div>
                    <p className="body-md font-medium text-muted-foreground">Total Tasks</p>
                    <p className="text-3xl font-bold mt-1 text-foreground">{total}</p>
                </div>

                <div className="surface-card p-6 hover:-translate-y-0.5 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                            <Clock className="size-5" />
                        </div>
                    </div>
                    <p className="body-md font-medium text-muted-foreground">In Progress</p>
                    <p className="text-3xl font-bold mt-1 text-foreground">{doing}</p>
                </div>

                <div className="surface-card p-6 hover:-translate-y-0.5 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="size-5" />
                        </div>
                    </div>
                    <p className="body-md font-medium text-muted-foreground">Completed</p>
                    <p className="text-3xl font-bold mt-1 text-foreground">{done}</p>
                </div>

                <div className="surface-card p-6 hover:-translate-y-0.5 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-destructive/10 rounded-lg text-destructive">
                            <AlertTriangle className="size-5" />
                        </div>
                    </div>
                    <p className="body-md font-medium text-muted-foreground">Overdue</p>
                    <p className="text-3xl font-bold mt-1 text-foreground">{overdue}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Tasks Table */}
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
                                {recentTasks.map((task) => (
                                    <tr key={task.id} className="hover:bg-surface-container-low/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full", 
                                                    task.status === "done" ? "bg-emerald-500" : task.status === "doing" ? "bg-primary" : "bg-muted-foreground"
                                                )} />
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
                                            {formatDate(task.deadline)}
                                        </td>
                                    </tr>
                                ))}
                                {recentTasks.length === 0 && (
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

                {/* Activity Feed */}
                <div className="lg:col-span-4 surface-card p-6 flex flex-col">
                    <h3 className="title-sm font-semibold mb-6">Activity Feed</h3>
                    
                    <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-border/50 flex-1">
                        {activities.map((activity) => (
                            <div key={activity.id} className="relative flex gap-4">
                                <div className={cn(
                                    "w-7 h-7 rounded-full flex items-center justify-center text-white ring-4 ring-card z-10 shrink-0",
                                    activity.type === "create" ? "bg-primary" : activity.type === "update" ? "bg-amber-500" : "bg-destructive"
                                )}>
                                    {activity.type === "create" && <PlusCircle className="size-3.5" />}
                                    {activity.type === "update" && <Edit2 className="size-3.5" />}
                                    {activity.type === "delete" && <Trash className="size-3.5" />}
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        <span className="text-foreground font-medium">{activity.message}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground/70 mt-1">
                                        {formatDate(activity.createdAt)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="w-full mt-8 bg-surface-container-low hover:bg-surface-container-high border-none">
                        View Full History
                    </Button>
                </div>
            </div>
        </div>
    );
}