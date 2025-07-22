export type DayType = "weekend" | "weekday";
export type DateState = {
    isSelected: boolean;
    isToday: boolean;
    dayType: DayType;
};
