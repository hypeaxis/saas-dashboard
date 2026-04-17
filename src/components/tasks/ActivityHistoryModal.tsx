"use client";

import { useAtom, useAtomValue } from "jotai";
import { X, PlusCircle, Edit2, Trash, History } from "lucide-react";
import { Button } from "src/components/ui/button";
import { activitiesAtom, activityHistoryAtom } from "src/store/tasks";
import { cn } from "src/lib/utils";
import { formatTaskDate } from "src/lib/task";

export default function ActivityHistoryModal() {
    const [historyState, setHistoryState] = useAtom(activityHistoryAtom);
    const activities = useAtomValue(activitiesAtom);

    const sortedActivities = [...activities].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const closeModal = () => {
        setHistoryState({ isOpen: false, taskId: null });
    };

    if (!historyState.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4">
            <div className="w-full max-w-xl rounded-xl bg-surface-container-lowest shadow-2xl overflow-hidden border border-border/20 flex flex-col max-h-[80vh]">
                <div className="p-6 border-b border-border/40 flex justify-between items-center bg-surface-container-low/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <History className="size-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-foreground">
                                Activity History
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Detailed log of all task changes
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface-container-high rounded-md transition-colors"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
                    <div className="relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-border/50">
                        {sortedActivities.map((activity) => (
                            <div key={activity.id} className="relative flex gap-4 pb-6 last:pb-0">
                                <div className={cn(
                                    "w-7 h-7 rounded-full flex items-center justify-center text-white ring-4 ring-card z-10 shrink-0",
                                    activity.type === "create" ? "bg-primary" : activity.type === "update" ? "bg-amber-500" : "bg-destructive"
                                )}>
                                    {activity.type === "create" && <PlusCircle className="size-3.5" />}
                                    {activity.type === "update" && <Edit2 className="size-3.5" />}
                                    {activity.type === "delete" && <Trash className="size-3.5" />}
                                </div>
                                <div>
                                    <p className="text-sm text-foreground font-medium leading-tight">
                                        {activity.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground/70 mt-1">
                                        {formatTaskDate(activity.createdAt)}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {sortedActivities.length === 0 && (
                            <div className="text-center py-10 text-muted-foreground italic text-sm">
                                No activity recorded yet.
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t border-border/40 bg-surface-container-low/20 flex justify-end">
                    <Button onClick={closeModal} variant="ghost" className="px-6">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}