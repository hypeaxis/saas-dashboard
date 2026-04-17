import { cn } from "src/lib/utils";
import {
    TASK_PRIORITY_BADGE_CLASSES,
    TASK_PRIORITY_LABELS,
    TASK_STATUS_BADGE_CLASSES,
    TASK_STATUS_LABELS,
} from "src/lib/task";
import type { Priority, Status } from "src/types/task";

export function StatusBadge({ status }: { status: Status }) {
    return (
        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide", TASK_STATUS_BADGE_CLASSES[status])}>
            {TASK_STATUS_LABELS[status]}
        </span>
    );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
    return (
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide", TASK_PRIORITY_BADGE_CLASSES[priority])}>
            {TASK_PRIORITY_LABELS[priority]}
        </span>
    );
}
