import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import type { ClassResponse, NewClass } from "@/entities/class";
import Plus from "@/shared/icons/Plus.svg";
import { Table } from "@/shared/ui/table";

import { handleAddClass } from "../model/handlers";
import s from "./ClassesTable.module.scss";
import { getColumns } from "./columns";

type Props = {
    data: ClassResponse[];
};

export const ClassesTable = ({ data }: Props) => {
    const headerClasses: Record<string, string> = {
        name: s.className,
        actions: s.action,
    };
    const t = useTranslations();

    const { register, reset, handleSubmit } = useForm<NewClass>({
        defaultValues: {
            name: "",
        },
    });

    const onClick = (data: NewClass) => {
        handleAddClass(data, () => reset());
    };

    return (
        <Table
            data={data}
            columns={getColumns(t)}
            headerClassName={(id) => headerClasses[id] ?? ""}
            renderExtraRowTop={() => (
                <tr className={s.line}>
                    <td>
                        <input
                            placeholder="Class"
                            className={s.input}
                            autoComplete="off"
                            {...register("name")}
                        />
                    </td>
                    <td>
                        <button
                            className={s.actionCell}
                            type="button"
                            onClick={handleSubmit(onClick)}
                        >
                            <Plus />
                        </button>
                    </td>
                    <td />
                </tr>
            )}
            renderEmptyRow
        />
    );
};
