import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import React from "react";

import s from "./Table.module.scss";

interface TableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    headerClassName?: (columnId: string) => string;
    cellClassName?: (columnId: string) => string;
    renderExtraRowTop?: () => React.ReactNode;
    renderEmptyRow?: boolean;
    renderExtraRowBottom?: (index: number) => React.ReactNode;
    minRows?: number;
}

export function Table<TData>({
    data,
    columns,
    headerClassName,
    cellClassName,
    renderExtraRowTop,
    renderEmptyRow,
    renderExtraRowBottom,
    minRows,
}: TableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const rowsQuantity = minRows
        ? Math.max(0, minRows - (data?.length ?? 0))
        : 0;

    return (
        <table className={s.table}>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className={clsx(
                                    s.header,
                                    headerClassName?.(header.column.id)
                                )}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {renderExtraRowTop && renderExtraRowTop()}
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className={s.line}>
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className={cellClassName?.(cell.column.id)}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                {renderEmptyRow && (
                    <tr>
                        {[...Array(columns.length)].map((_, i) => (
                            <td key={i} />
                        ))}
                    </tr>
                )}
                {renderExtraRowBottom &&
                    [...Array(rowsQuantity)].map((_, i) => (
                        <React.Fragment key={i}>
                            {renderExtraRowBottom(i)}
                        </React.Fragment>
                    ))}
            </tbody>
        </table>
    );
}
