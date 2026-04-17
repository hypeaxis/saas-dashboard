"use client";

import { useAtomValue } from "jotai";
import { useSetAtom } from "jotai";
import { activitiesAtom, activityHistoryAtom, tasksAtom } from "src/store/tasks";
import ActivityHistoryModal from "src/components/tasks/ActivityHistoryModal";
import DashboardStats from "src/components/dashboard/DashboardStats";
import RecentTasksTable from "src/components/dashboard/RecentTasksTable";
import ActivityFeed from "src/components/dashboard/ActivityFeed";

export default function DashboardPage() {
    const tasks = useAtomValue(tasksAtom);
    const activities = useAtomValue(activitiesAtom);

    const total = tasks.length;
    const doing = tasks.filter((t) => t.status === "doing").length;
    const done = tasks.filter((t) => t.status === "done").length;
    const overdue = tasks.filter((t) => {
        if (t.status === "done" || !t.deadline) return false;
        return new Date(t.deadline).getTime() < new Date().getTime();
    }).length;

    const recentTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);

    const recentActivities = [...activities]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);

    const setHistoryModal = useSetAtom(activityHistoryAtom);

    return (
        <div className="w-full space-y-8 ">
            <div>
                <p className="label-sm text-tertiary">Overview</p>
                <h1 className="headline-md mt-1">Dashboard</h1>
            </div>

            <DashboardStats total={total} doing={doing} done={done} overdue={overdue} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <RecentTasksTable tasks={recentTasks} />

                <ActivityFeed
                    activities={recentActivities}
                    onViewHistory={() => setHistoryModal({ isOpen: true, taskId: null })}
                />
            </div>

            <ActivityHistoryModal />
        </div>
    );
}