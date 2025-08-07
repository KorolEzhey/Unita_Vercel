import type { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";

import type { Attendance } from "../model/types";
import s from "./AttendanceTable.module.scss";

type Props = {
    table: Table<Attendance>;
};

export const TableBody: React.FC<Props> = ({ table }) => {
    return (
        <>
            {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td
                            key={cell.id}
                            className={clsx(s.cell, {
                                [s.cellLeft]: cell.column.id === "studentName",
                            })}
                        >
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};
