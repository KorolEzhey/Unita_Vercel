import { flexRender, type Table } from "@tanstack/react-table";
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
                            style={{
                                borderRight:
                                    cell.column.id === "studentName"
                                        ? "none"
                                        : undefined,
                            }}
                            className={clsx(
                                s.cell,
                                cell.column.id === "index" && s.sticky1,
                                cell.column.id === "studentName" && [
                                    s.cellLeft,
                                    s.sticky2,
                                ],
                                cell.column.id === "separator" && s.sticky3
                            )}
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
