import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import type { NewSubject, SubjectResponse } from "@/entities/subject";
import Plus from "@/shared/icons/Plus.svg";
import { Table } from "@/shared/ui/table";

import { handleAddSubject } from "../model/handlers";
import { getColumns } from "./columns";
import s from "./SubjectsTable.module.scss";

type Props = {
    data: SubjectResponse[];
};

export const SubjectsTable = ({ data }: Props) => {
    const headerClasses: Record<string, string> = {
        name: s.subjectName,
        actions: s.action,
    };
    const t = useTranslations();

    const { register, reset, handleSubmit } = useForm<NewSubject>({
        defaultValues: {
            name: "",
        },
    });

    const onClick = (data: NewSubject) => {
        handleAddSubject(data, () => reset());
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
                            placeholder="Subject"
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
