"use client";

import { Button } from "src/components/ui/button";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    totalItems: number;
    onPrev: () => void;
    onNext: () => void;
};

export default function Pagination({
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    onPrev,
    onNext,
}: PaginationProps) {
    return (
        <div className="px-6 py-4 bg-surface-container-lowest flex items-center justify-between border-t border-border/40">
            <span className="text-xs text-muted-foreground">
                Showing {totalItems > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, totalItems)} of {totalItems} tasks
            </span>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={onPrev}
                    className="text-xs font-medium"
                >
                    Previous
                </Button>

                <span className="text-xs font-medium px-2">
                    Page {currentPage} of {totalPages || 1}
                </span>

                <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentPage >= totalPages || totalPages === 0}
                    onClick={onNext}
                    className="text-xs font-medium"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
