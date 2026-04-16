"use client";

import { useAtom, useAtomValue } from "jotai";
import { 
    Search, 
    Plus, 
    Edit2, 
    Trash, 
    SignalHigh, 
    SignalMedium, 
    SignalLow,
    Zap,
    Users,
    History,
    ArrowRight
} from "lucide-react";
import { 
    filteredTasksAtom, 
    searchAtom, 
    filterAtom, 
    deleteConfirmAtom,
    taskModalAtom,
    type TaskFilter 
} from "src/store/tasks";
import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import type { Priority, Status } from "src/types/task";
import DeleteConfirmModal from "src/components/tasks/DeleteConfirmModal";

// Helper định dạng ngày
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
        done: { label: "Done", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
    };
    const { label, className } = config[status];
    return (
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide", className)}>
            {label}
        </span>
    );
};

// Component UI hiển thị Priority kèm Icon
const PriorityBadge = ({ priority }: { priority: Priority }) => {
    const config = {
        low: { icon: SignalLow, className: "text-muted-foreground" },
        medium: { icon: SignalMedium, className: "text-primary" },
        high: { icon: SignalHigh, className: "text-destructive" },
    };
    const { icon: Icon, className } = config[priority];
    return (
        <div className="flex items-center gap-1.5 text-foreground">
            <Icon className={cn("size-4", className)} />
            <span className="text-sm capitalize">{priority}</span>
        </div>
    );
};

export default function TasksPage() {
    // Kết nối State với Jotai
    const tasks = useAtomValue(filteredTasksAtom);
    const [search, setSearch] = useAtom(searchAtom);
    const [filter, setFilter] = useAtom(filterAtom);
    const [modalState, setModalState] = useAtom(taskModalAtom);
    const [deleteState, setDeleteState] = useAtom(deleteConfirmAtom);

    const handleCreateTask = () => {
        setModalState({ isOpen: true, editingTaskId: null });
    };

    const handleEditTask = (taskId: string) => {
        setModalState({ isOpen: true, editingTaskId: taskId });
    };

    const handleDeleteTask = (taskId: string) => {
        setDeleteState({ isOpen: true, taskId });
    };

    return (
        <>
            <div className={cn("space-y-8 max-w-[1280px] transition-all duration-200", (modalState.isOpen || deleteState.isOpen) && "blur-[2px]") }>
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="headline-md tracking-tight text-foreground">Project Tasks</h1>
                    <p className="body-md text-muted-foreground mt-1">Manage, track and assign enterprise-level operational tasks.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                        <input 
                            type="text" 
                            placeholder="Quick search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-surface-container-low border-none rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as TaskFilter)}
                        className="w-full sm:w-auto appearance-none bg-surface-container-low border-none rounded-lg px-4 py-2 text-sm font-medium text-foreground focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="todo">Todo</option>
                        <option value="doing">In Progress</option>
                        <option value="done">Done</option>
                    </select>

                    <Button onClick={handleCreateTask} className="cta-gradient w-full sm:w-auto">
                        <Plus className="size-4" />
                        Create Task
                    </Button>
                </div>
            </div>

            {/* Task Table Container */}
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
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className={cn("text-sm font-medium text-foreground", task.status === "done" && "line-through opacity-70")}>
                                                {task.title}
                                            </span>
                                            {task.description && (
                                                <span className="text-xs text-muted-foreground mt-0.5 truncate max-w-[300px]">
                                                    {task.description}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <StatusBadge status={task.status} />
                                    </td>
                                    <td className="px-6 py-5">
                                        <PriorityBadge priority={task.priority} />
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={cn("text-sm", task.status === "done" ? "text-muted-foreground/50 line-through" : "text-muted-foreground")}>
                                            {formatDate(task.deadline)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={() => handleEditTask(task.id)}
                                                aria-label={`Edit ${task.title}`}
                                                className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-surface-container-high"
                                            >
                                                <Edit2 className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteTask(task.id)}
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
                
                {/* Table Footer */}
                <div className="px-6 py-4 bg-surface-container-lowest flex items-center justify-between border-t border-border/40">
                    <span className="text-xs text-muted-foreground">Showing {tasks.length} tasks</span>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" disabled className="text-xs font-medium">Previous</Button>
                        <Button variant="ghost" size="sm" disabled className="text-xs font-medium">Next</Button>
                    </div>
                </div>
            </div>

            {/* Secondary Quick Actions (Bento-style) */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="bg-primary/5 p-6 rounded-xl flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Zap className="size-5" />
                    </div>
                    <h3 className="title-sm text-foreground">AI Priority Sweep</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">Let our intelligence engine suggest priority changes based on upcoming deadlines.</p>
                    <button className="mt-2 text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all w-fit">
                        Run Sweep <ArrowRight className="size-3" />
                    </button>
                </div>
                
                <div className="bg-surface-container-low p-6 rounded-xl flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-foreground">
                        <Users className="size-5" />
                    </div>
                    <h3 className="title-sm text-foreground">Bulk Reassign</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">Move all "Todo" tasks to a new team member or department instantly.</p>
                    <button className="mt-2 text-foreground text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all w-fit">
                        Select Member <ArrowRight className="size-3" />
                    </button>
                </div>
                
                <div className="bg-tertiary/5 p-6 rounded-xl flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                        <History className="size-5" />
                    </div>
                    <h3 className="title-sm text-foreground">Review Activity</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">See recent changes made to task statuses and ownership in the last 24h.</p>
                    <button className="mt-2 text-tertiary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all w-fit">
                        View Audit Log <ArrowRight className="size-3" />
                    </button>
                </div>
            </div> */}
            </div>

            <DeleteConfirmModal />
        </>
    );
}