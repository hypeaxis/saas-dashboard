"use client";

import { useSetAtom } from "jotai";
import { signOut } from "next-auth/react";
import { LogOut, Plus } from "lucide-react";
import { Button } from "src/components/ui/button";
import { taskModalAtom } from "src/store/tasks";

export default function AppTopbar({ email }: { email?: string | null }) {
    const setTaskModal = useSetAtom(taskModalAtom);

    const handleNewTask = () => {
        setTaskModal({ isOpen: true, editingTaskId: null });
    };

    return (
        <header className="mb-4 flex items-center justify-between gap-3 rounded-md bg-surface-container-lowest px-4 py-3">
            <div>
                <p className="label-sm text-muted-foreground">Logged in</p>
                <p className="title-sm">{email ?? "TaskMaster user"}</p>
            </div>

            <div className="flex items-center gap-2">
                <Button type="button" className="cta-gradient" onClick={handleNewTask}>
                    <Plus className="size-4" />
                    New Task
                </Button>
                <Button type="button" variant="ghost" onClick={() => signOut({ callbackUrl: "/login" })}>
                    <LogOut className="size-4" />
                    Sign out
                </Button>
            </div>
        </header>
    );
}