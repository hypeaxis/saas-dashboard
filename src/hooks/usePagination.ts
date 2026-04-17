import { useCallback, useEffect, useState } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
            return;
        }

        if (totalPages === 0 && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    const next = useCallback(() => {
        setCurrentPage((page) => Math.min(page + 1, totalPages || 1));
    }, [totalPages]);

    const prev = useCallback(() => {
        setCurrentPage((page) => Math.max(page - 1, 1));
    }, []);

    const reset = useCallback(() => {
        setCurrentPage(1);
    }, []);

    return {
        currentPage,
        currentItems,
        totalPages,
        startIndex,
        endIndex,
        next,
        prev,
        setCurrentPage,
        reset,
    };
}
