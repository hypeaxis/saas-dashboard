import { SignalHigh, SignalLow, SignalMedium } from "lucide-react";
import { cn } from "src/lib/utils";
import {
    TASK_PRIORITY_BADGE_CLASSES,
    TASK_PRIORITY_LABELS,
    TASK_STATUS_BADGE_CLASSES,
    TASK_STATUS_LABELS,
} from "src/lib/task";
import type { Priority, Status } from "src/types/task";

const priorityIcons: Record<Priority, typeof SignalLow> = {
    low: SignalLow,
    medium: SignalMedium,
    high: SignalHigh,
};

export function StatusBadge({ status }: { status: Status }) {
    return (
        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide", TASK_STATUS_BADGE_CLASSES[status])}>
            {TASK_STATUS_LABELS[status]}
        </span>
    );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
    const Icon = priorityIcons[priority];

    return (
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide", TASK_PRIORITY_BADGE_CLASSES[priority])}>
            <Icon className="size-3.5" />
            {TASK_PRIORITY_LABELS[priority]}
        </span>
    );
}
