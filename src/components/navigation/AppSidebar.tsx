"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartSpline, LayoutGrid, ListTodo } from "lucide-react";
import { cn } from "src/lib/utils";
import { signOut } from "next-auth/react";
import { LogOut, X } from "lucide-react";
import { Button } from "src/components/ui/button";
import { sidebarOpenAtom } from "src/store/tasks";
import { useAtom } from "jotai";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/tasks", label: "Task List", icon: ListTodo },
    { href: "/analytics", label: "Analytics", icon: ChartSpline },
];

export default function AppSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom);
    
    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside 
                className={cn(
                    "fixed inset-y-0 h-[100svh] left-0 z-50 flex w-[260px] shrink-0 flex-col bg-[#171b24] border-r border-[#2a2d3d] transition-transform duration-300 ease-in-out md:static md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex shrink-0 items-center justify-between p-6 border-b border-[#2a2d3d] mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight mb-1">TaskMaster</h2>
                        <p className="text-sm font-medium text-slate-400">SaaS Workspace</p>
                    </div>
                    <button 
                        className="md:hidden text-slate-400 hover:text-white p-1 rounded-md hover:bg-[#2a2d3d]"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="px-3 flex-1 overflow-y-auto custom-scrollbar">
                    <nav className="space-y-1">
                        {navItems.map(({ href, label, icon: Icon }) => {
                            const isActive = pathname === href || pathname.startsWith(`${href}/`);

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setIsOpen(false)} 
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all",
                                        isActive
                                            ? "bg-[#3b82f6] text-white shadow-md"
                                            : "bg-transparent text-slate-400 hover:bg-[#2a2d3d] hover:text-white"
                                    )}
                                >
                                    <Icon className="size-5" />
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 shrink-0 border-t border-[#2a2d3d] mt-2 mb-2">
                    <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white bg-[#2a2d3d]/60 hover:bg-[#3b82f6] hover:text-white transition-all justify-start"
                    >
                        <LogOut className="size-5" />
                        Sign out
                    </Button>
                </div>
            </aside>
        </>
    );
}