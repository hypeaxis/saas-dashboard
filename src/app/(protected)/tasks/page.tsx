"use client";

import { useAtom, useAtomValue } from "jotai";
import { Search, Plus, Eye, Edit2, Trash } from "lucide-react";
import { 
    filteredTasksAtom, 
    searchAtom, 
    filterAtom, 
    deleteConfirmAtom,
    taskModalAtom,
    taskDetailAtom,
    type TaskFilter 
} from "src/store/tasks";
import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import DeleteConfirmModal from "src/components/tasks/DeleteConfirmModal";
import TaskDetailModal from "src/components/tasks/TaskDetailModal";
import { PriorityBadge, StatusBadge } from "src/components/tasks/TaskBadges";
import { formatTaskDate } from "src/lib/task";

export default function TasksPage() {
    const tasks = useAtomValue(filteredTasksAtom);
    const [search, setSearch] = useAtom(searchAtom);
    const [filter, setFilter] = useAtom(filterAtom);
    const [modalState, setModalState] = useAtom(taskModalAtom);
    const [deleteState, setDeleteState] = useAtom(deleteConfirmAtom);
    const [, setDetailState] = useAtom(taskDetailAtom);

    const handleCreateTask = () => {
        setModalState({ isOpen: true, editingTaskId: null });
    };

    const handleViewTask = (taskId: string) => {
        setDetailState({ isOpen: true, taskId });
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="headline-md tracking-tight text-foreground">Project Tasks</h1>
                    <p className="body-md text-muted-foreground mt-1">Manage, track and assign enterprise-level operational tasks.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
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
                                            {formatTaskDate(task.deadline)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={() => handleViewTask(task.id)}
                                                aria-label={`View ${task.title}`}
                                                className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-surface-container-high"
                                            >
                                                <Eye className="size-4" />
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

                <div className="px-6 py-4 bg-surface-container-lowest flex items-center justify-between border-t border-border/40">
                    <span className="text-xs text-muted-foreground">Showing {tasks.length} tasks</span>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" disabled className="text-xs font-medium">Previous</Button>
                        <Button variant="ghost" size="sm" disabled className="text-xs font-medium">Next</Button>
                    </div>
                </div>
            </div>
        </div>
            <DeleteConfirmModal />
            <TaskDetailModal />
        </>
    );
}