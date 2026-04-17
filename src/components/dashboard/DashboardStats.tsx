"use client";

import { AlertTriangle, CheckCircle2, Clock, ListTodo } from "lucide-react";

type DashboardStatsProps = {
    total: number;
    doing: number;
    done: number;
    overdue: number;
};

export default function DashboardStats({ total, doing, done, overdue }: DashboardStatsProps) {
    return (
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
    );
}
