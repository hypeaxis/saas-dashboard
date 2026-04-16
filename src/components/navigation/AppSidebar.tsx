"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartSpline, LayoutGrid, ListTodo } from "lucide-react";
import { cn } from "src/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/tasks", label: "Task List", icon: ListTodo },
    { href: "/analytics", label: "Analytics", icon: ChartSpline },
];

export default function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="surface-panel p-4 md:p-5">
            <div className="mb-8 px-1">
                <p className="label-sm text-muted-foreground">TaskMaster</p>
                <p className="title-sm mt-2 text-foreground">SaaS Workspace</p>
            </div>

            <nav className="space-y-2">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || pathname.startsWith(`${href}/`);

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                isActive
                                    ? "bg-surface-container-high text-foreground"
                                    : "bg-surface-container-lowest text-muted-foreground hover:bg-surface-container-high hover:text-foreground"
                            )}
                        >
                            <Icon className="size-4" />
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}