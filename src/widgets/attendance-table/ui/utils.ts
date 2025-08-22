import capitalize from "capitalize";

export const getMonthsMap = (
    subjectsByDay: {
        date: Date;
        subjects: { subject: string; hours: number }[];
    }[],
    translateMonth: (monthIndex: string) => string
): Map<
    number,
    { cells: { isLabel: boolean; name?: string; colspan: number }[] }
> => {
    const monthsMap = new Map<
        number,
        { cells: { isLabel: boolean; name?: string; colspan: number }[] }
    >();

    for (const day of subjectsByDay) {
        const month = day.date.getMonth();
        const subjectsCount = day.subjects.length;

        if (!monthsMap.has(month)) {
            // первый день месяца — создаём ячейку с названием
            monthsMap.set(month, {
                cells: [
                    {
                        isLabel: true,
                        name: capitalize(translateMonth(String(month))),
                        colspan: subjectsCount,
                    },
                ],
            });
        } else {
            // остальные дни — обычные ячейки без названия
            monthsMap.get(month)!.cells.push({
                isLabel: false,
                colspan: subjectsCount,
            });
        }
    }

    return monthsMap;
};
