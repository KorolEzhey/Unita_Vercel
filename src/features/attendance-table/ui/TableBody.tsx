import { flexRender, Table } from "@tanstack/react-table";
import clsx from "clsx";
import s from "./AttendanceTable.module.scss";
import { Attendance } from "../model/types";

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
