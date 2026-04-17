"use client";

import { Plus, Search } from "lucide-react";
import { Button } from "src/components/ui/button";
import type { TaskFilter } from "src/store/tasks";

type TaskToolbarProps = {
    search: string;
    filter: TaskFilter;
    onSearchChange: (value: string) => void;
    onFilterChange: (value: TaskFilter) => void;
    onCreateTask: () => void;
};

export default function TaskToolbar({
    search,
    filter,
    onSearchChange,
    onFilterChange,
    onCreateTask,
}: TaskToolbarProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h1 className="headline-md tracking-tight text-foreground">Project Tasks</h1>
                <p className="body-md text-muted-foreground mt-1">
                    Manage, track and assign enterprise-level operational tasks.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                    <input
                        type="text"
                        placeholder="Quick search tasks..."
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        className="w-full bg-surface-container-low border-none rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                </div>

                <select
                    value={filter}
                    onChange={(event) => onFilterChange(event.target.value as TaskFilter)}
                    className="w-full sm:w-auto appearance-none bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm font-medium text-foreground focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none"
                >
                    <option value="all">All Status</option>
                    <option value="todo">Todo</option>
                    <option value="doing">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <Button onClick={onCreateTask} className="cta-gradient w-full sm:w-auto">
                    <Plus className="size-4" />
                    Create Task
                </Button>
            </div>
        </div>
    );
}
