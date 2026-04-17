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
        <div className="h-screen overflow-hidden bg-white text-foreground flex">
            <AppSidebar />

            <div className="flex flex-col flex-1 min-w-0 bg-white">
                <AppTopbar user={{ name: session.user?.name, email: session.user?.email }} />

                <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    {children}
                </main>
            </div>

            <TaskModal />
        </div>
    );
}