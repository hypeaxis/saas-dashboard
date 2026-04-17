"use client";

import { Edit2, PlusCircle, Trash } from "lucide-react";
import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import { formatTaskDate } from "src/lib/task";
import type { Activity } from "src/types/task";

type ActivityFeedProps = {
    activities: Activity[];
    onViewHistory: () => void;
};

export default function ActivityFeed({ activities, onViewHistory }: ActivityFeedProps) {
    return (
        <div className="lg:col-span-4 surface-card p-6 flex flex-col">
            <h3 className="title-sm font-semibold mb-6">Activity Feed</h3>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-border/50 flex-1">
                {activities.map((activity) => (
                    <div key={activity.id} className="relative flex gap-4">
                        <div
                            className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center text-white ring-4 ring-card z-10 shrink-0",
                                activity.type === "create"
                                    ? "bg-primary"
                                    : activity.type === "update"
                                        ? "bg-amber-500"
                                        : "bg-destructive"
                            )}
                        >
                            {activity.type === "create" && <PlusCircle className="size-3.5" />}
                            {activity.type === "update" && <Edit2 className="size-3.5" />}
                            {activity.type === "delete" && <Trash className="size-3.5" />}
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                <span className="text-foreground font-medium">{activity.message}</span>
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-1">
                                {formatTaskDate(activity.createdAt)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Button
                onClick={onViewHistory}
                variant="outline"
                className="w-full mt-8 bg-surface-container-low hover:bg-surface-container-high border-none"
            >
                View Full History
            </Button>
        </div>
    );
}
