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

    return (
        <div className="space-y-8">

        <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-2 text-sm">
            Detailed analysis of your performance and workload.
            </p>
        </div>

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

        <div className="grid gap-6 md:grid-cols-2">

            <div className="flex min-h-[380px] flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Priority Distribution</h3>
            <div className="flex flex-1 items-center justify-center overflow-hidden">
                <HighchartsReact highcharts={Highcharts} options={priorityChartOptions} />
            </div>
            </div>

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