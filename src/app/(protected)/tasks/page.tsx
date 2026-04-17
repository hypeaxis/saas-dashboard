"use client";

import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { 
    filteredTasksAtom, 
    searchAtom, 
    filterAtom, 
    deleteConfirmAtom,
    taskModalAtom,
    taskDetailAtom,
    type TaskFilter 
} from "src/store/tasks";
import DeleteConfirmModal from "src/components/tasks/DeleteConfirmModal";
import TaskDetailModal from "src/components/tasks/TaskDetailModal";
import TaskToolbar from "src/components/tasks/TaskToolbar";
import TaskTable from "src/components/tasks/TaskTable";
import Pagination from "src/components/tasks/Pagination";
import { usePagination } from "src/hooks/usePagination";
import { cn } from "src/lib/utils";

export default function TasksPage() {
    const tasks = useAtomValue(filteredTasksAtom);
    const [search, setSearch] = useAtom(searchAtom);
    const [filter, setFilter] = useAtom(filterAtom);
    const [modalState, setModalState] = useAtom(taskModalAtom);
    const [deleteState, setDeleteState] = useAtom(deleteConfirmAtom);
    const [, setDetailState] = useAtom(taskDetailAtom);
    const ITEMS_PER_PAGE = 10;
    const {
        currentPage,
        currentItems: paginatedTasks,
        totalPages,
        startIndex,
        endIndex,
        next,
        prev,
        reset,
    } = usePagination(tasks, ITEMS_PER_PAGE);

    useEffect(() => {
        reset();
    }, [search, filter, reset]);

    const handleCreateTask = () => {
        setModalState({ isOpen: true, editingTaskId: null });
    };

    const handleViewTask = (taskId: string) => {
        setDetailState({ isOpen: true, taskId });
    };

    const handleDeleteTask = (taskId: string) => {
        setDeleteState({ isOpen: true, taskId });
    };

    return (
        <>
            <div className={cn("space-y-8 w-full transition-all duration-200", (modalState.isOpen || deleteState.isOpen) && "blur-[2px]") }>
                <TaskToolbar
                    search={search}
                    filter={filter}
                    onSearchChange={setSearch}
                    onFilterChange={setFilter}
                    onCreateTask={handleCreateTask}
                />

                <div className="surface-card overflow-hidden">
                    <TaskTable
                        tasks={paginatedTasks}
                        onViewTask={handleViewTask}
                        onDeleteTask={handleDeleteTask}
                    />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        totalItems={tasks.length}
                        onPrev={prev}
                        onNext={next}
                    />
                </div>
            </div>
            <DeleteConfirmModal />
            <TaskDetailModal />
        </>
    );
}