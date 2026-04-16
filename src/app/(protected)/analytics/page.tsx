"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
    tasksAtom,
    priorityCountsAtom,
    completionRateAtom,
    statusCountsAtom,
} from "src/store/tasks";
import {
    TASK_PRIORITY_CHART_COLORS,
    TASK_PRIORITY_LABELS,
    TASK_STATUS_CHART_COLORS,
    TASK_STATUS_LABELS,
} from "src/lib/task";
import { TASK_PRIORITY_VALUES, TASK_STATUS_VALUES } from "src/types/task";

export default function AnalyticsPage() {
    const tasks = useAtomValue(tasksAtom);
    const priorityCounts = useAtomValue(priorityCountsAtom);
    const statusCounts = useAtomValue(statusCountsAtom);
    const completionRate = useAtomValue(completionRateAtom);

    const priorityChartOptions = useMemo(() => {
        const data = TASK_PRIORITY_VALUES.map((priority) => ({
            name: TASK_PRIORITY_LABELS[priority],
            y: priorityCounts[priority],
            color: TASK_PRIORITY_CHART_COLORS[priority],
        }));

        return {
            chart: {
                type: "pie",
                backgroundColor: "transparent",
                height: 280,
                spacingTop: 8,
                spacingBottom: 8,
                spacingLeft: 8,
                spacingRight: 8,
            },
            title: { text: "" },
            tooltip: { pointFormat: "<b>{point.y} tasks</b>" },
            plotOptions: {
                pie: {
                    innerSize: "60%",
                    borderWidth: 2,
                    borderColor: "#ffffff",
                    size: "88%",
                    dataLabels: { enabled: true, format: "<b>{point.name}</b>: {point.y}" },
                },
            },
            series: [{ name: "Priority", colorByPoint: true, data }],
            credits: { enabled: false },
        };
    }, [priorityCounts]);

    const statusChartOptions = useMemo(() => {
        return {
            chart: {
                type: "column",
                backgroundColor: "transparent",
                height: 280,
                spacingTop: 8,
                spacingBottom: 16,
                spacingLeft: 8,
                spacingRight: 8,
            },
            title: { text: "" },
            xAxis: {
                categories: TASK_STATUS_VALUES.map((status) => TASK_STATUS_LABELS[status]),
                lineColor: "#cbd5e1",
                labels: {
                    style: {
                        fontSize: "12px",
                    },
                },
            },
            yAxis: {
                title: { text: undefined },
                gridLineColor: "#e2e8f0",
                allowDecimals: false,
            },
            plotOptions: {
                column: {
                    borderRadius: 6,
                    pointPadding: 0.12,
                    groupPadding: 0.2,
                    maxPointWidth: 56,
                },
            },
            series: [
                {
                    name: "Tasks",
                    data: TASK_STATUS_VALUES.map((status) => ({
                        y: statusCounts[status],
                        color: TASK_STATUS_CHART_COLORS[status],
                    })),
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
    //         <h2 className="text-xl font-semibold">No analysis data available</h2>
    //         <p className="text-muted-foreground text-sm max-w-sm">
    //           Create some tasks in the Task List to see analytics.
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
            Detailed analysis of your performance and workload.
            </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
            <p className="mt-2 text-3xl font-bold">{tasks.length}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Completion Rate</h3>
            <p className="mt-2 text-3xl font-bold text-primary">
                {typeof completionRate === "number" ? `${completionRate.toFixed(1)}%` : completionRate}
            </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">In Progress</h3>
            <p className="mt-2 text-3xl font-bold">
                {statusCounts.doing}
            </p>
            </div>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
            {/* Priority Donut Chart */}
            <div className="flex min-h-[380px] flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Priority Distribution</h3>
            <div className="flex flex-1 items-center justify-center overflow-hidden">
                <HighchartsReact highcharts={Highcharts} options={priorityChartOptions} />
            </div>
            </div>

            {/* Status Column Chart */}
            <div className="flex min-h-[380px] flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Task Status</h3>
            <div className="flex flex-1 items-center justify-center overflow-hidden">
                <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
            </div>
            </div>
        </div>
        </div>
    );
}