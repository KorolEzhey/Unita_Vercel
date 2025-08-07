import capitalize from "capitalize";

export const getMonthsMap = (
    subjectsByDay: {
        date: Date;
        subjects: { subject: string; hours: number }[];
    }[],
    translateMonth: (monthIndex: string) => string
): Map<number, { name: string; colspan: number }> => {
    const monthsMap = new Map<number, { name: string; colspan: number }>();

    for (const day of subjectsByDay) {
        const month = day.date.getMonth();
        const current = monthsMap.get(month);
        const additionalColSpan = day.subjects.length;

        if (current) {
            current.colspan += additionalColSpan;
        } else {
            monthsMap.set(month, {
                name: capitalize(translateMonth(String(month))),
                colspan: additionalColSpan,
            });
        }
    }

    return monthsMap;
};
