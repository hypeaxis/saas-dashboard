"use client";

import React, { useMemo } from "react";
import { useAtomValue } from "jotai";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
    tasksAtom,
    priorityCountsAtom,
    completionRateAtom,
    statusCountsAtom,
} from "src/store/tasks";

export default function AnalyticsPage() {

    const tasks = useAtomValue(tasksAtom);
    const priorityCounts = useAtomValue(priorityCountsAtom);
    const statusCounts = useAtomValue(statusCountsAtom);
    const completionRate = useAtomValue(completionRateAtom);

    const priorityChartOptions = useMemo(() => {

        const priorityLabels: Record<keyof typeof priorityCounts, string> = {
            low: "Low",
            medium: "Medium",
            high: "High",
        };

        const data = Object.entries(priorityCounts).map(([key, value]) => ({
        name: priorityLabels[key as keyof typeof priorityLabels],
        y: value as number,

        color: 
            key === "high" ? "var(--destructive)" : 
            key === "medium" ? "var(--warning)" : "var(--success)", 
        }));

        return {
        chart: { type: "pie", backgroundColor: "transparent" },
        title: { text: "" },
        tooltip: { pointFormat: "<b>{point.y} tasks</b>" },
        plotOptions: {
            pie: {
            innerSize: "60%", // Biến thành Donut chart cho hiện đại
            dataLabels: { enabled: true, format: "<b>{point.name}</b>: {point.y}" },
            },
        },
        series: [{ name: "Priority", colorByPoint: true, data }],
        credits: { enabled: false },
        };
    }, [priorityCounts]);

    const statusChartOptions = useMemo(() => {
        return {
        chart: { type: "column", backgroundColor: "transparent" },
        title: { text: "" },
        xAxis: { categories: ["Todo", "In Progress", "Done"] },
        yAxis: { title: { text: "Số lượng Task" } },
        series: [
            {
            name: "Tasks",
            data: [
                { y: statusCounts.todo, color: "var(--muted-foreground)" },
                { y: statusCounts.doing, color: "var(--primary)" },
                { y: statusCounts.done, color: "var(--success)" },
            ],
            showInLegend: false,
            },
        ],
        credits: { enabled: false },
        };
    }, [statusCounts]);

    //  Empty State
    //   if (tasks.length === 0) {
    //     return (
    //       <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 text-center">
    //         <div className="rounded-full bg-muted p-6">
    //           <svg className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    //           </svg>
    //         </div>
    //         <h2 className="text-xl font-semibold">Chưa có dữ liệu phân tích</h2>
    //         <p className="text-muted-foreground text-sm max-w-sm">
    //           Hãy tạo thêm một vài công việc ở màn hình Task List để xem các biểu đồ thống kê.
    //         </p>
    //       </div>
    //     );
    //   }

    return (
        <div className="space-y-8">
        {/* Header */}
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-2 text-sm">
            Phân tích chi tiết hiệu suất và khối lượng công việc của bạn.
            </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Tổng số công việc</h3>
            <p className="mt-2 text-3xl font-bold">{tasks.length}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Tỉ lệ hoàn thành</h3>
            <p className="mt-2 text-3xl font-bold text-primary">
                {typeof completionRate === "number" ? `${completionRate.toFixed(1)}%` : completionRate}
            </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Đang thực hiện</h3>
            <p className="mt-2 text-3xl font-bold">
                {statusCounts.doing}
            </p>
            </div>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
            {/* Priority Donut Chart */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Phân bổ độ ưu tiên</h3>
            <div className="h-[300px] w-full">
                <HighchartsReact highcharts={Highcharts} options={priorityChartOptions} />
            </div>
            </div>

            {/* Status Column Chart */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Trạng thái công việc</h3>
            <div className="h-[300px] w-full">
                <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
            </div>
            </div>
        </div>
        </div>
    );
}