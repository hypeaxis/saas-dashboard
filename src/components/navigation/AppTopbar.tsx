"use client";

import { useSetAtom } from "jotai";
import { Menu,Plus } from "lucide-react"; 
import { Button } from "src/components/ui/button";
import { taskModalAtom,sidebarOpenAtom } from "src/store/tasks";

interface UserProps {
    user?: {
        name?: string | null;
        email?: string | null;
    };
}

export default function AppTopbar({ user }: UserProps) {
    const setTaskModal = useSetAtom(taskModalAtom);
    const setSidebarOpen = useSetAtom(sidebarOpenAtom);
    
    const getInitials = (name?: string | null) => {
        if (!name) return "U"; 
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
        }
        return name.charAt(0).toUpperCase();
    };

    const handleNewTask = () => {
        setTaskModal({ isOpen: true, editingTaskId: null });
    };

    const displayName = user?.name || user?.email || "User";

    return (
        <header className="mb-4 flex items-center justify-between gap-3 rounded-md bg-surface-container-lowest px-4 py-3">
            <div className="flex items-center gap-2">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="size-5" />
                </Button>

                <Button type="button" className="cta-gradient" onClick={handleNewTask}>
                    <Plus className="size-4" />
                    New Task
                </Button>
            </div>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                    {getInitials(user?.name)}
                </div>
                <div className="hidden md:block text-left mr-1">
                    <p className="text-sm font-semibold text-slate-900 leading-none">
                        {displayName}
                    </p>
                </div>
            </div>
        </header>
    );
}