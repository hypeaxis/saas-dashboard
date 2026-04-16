import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/lib/auth";
import AppSidebar from "src/components/navigation/AppSidebar";
import AppTopbar from "src/components/navigation/AppTopbar";
import TaskModal from "src/components/tasks/TaskModal";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-surface text-foreground">
            <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-4 px-4 py-4 md:grid-cols-[220px_1fr] md:px-6 lg:px-8">
                <AppSidebar />

                <div className="surface-panel flex min-h-0 flex-col p-4 md:p-5">
                    <AppTopbar email={session.user?.email} />

                    <main className="min-h-0 flex-1 overflow-auto rounded-md bg-surface-container-lowest p-4 md:p-5">{children}</main>
                </div>
            </div>

            <TaskModal />
        </div>
    );
}