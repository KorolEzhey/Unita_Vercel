import clsx from "clsx";
import { useTranslations } from "next-intl";

import type { GradesTypes } from "@/pages/grade-book-desktop/ui/GradeBookPageDesktop";
import { SwitchButton } from "@/shared/ui/switch";

import s from "./SwitchGradesTypes.module.scss";

type SwitchGradesTypesProps = {
    activeGradeType: GradesTypes;
    setActiveGradeType: (type: GradesTypes) => void;
};

export const SwitchGradesTypes = ({
    activeGradeType,
    setActiveGradeType,
}: SwitchGradesTypesProps) => {
    const t = useTranslations("grades-types");

    return (
        <div className={s.wrapper}>
            <SwitchButton
                onClick={() => setActiveGradeType("all")}
                isActive={activeGradeType === "all"}
                className={clsx(s.all, {
                    [s.button]: activeGradeType !== "all",
                })}
            >
                {t("all")}
            </SwitchButton>
            <SwitchButton
                onClick={() => setActiveGradeType("final")}
                isActive={activeGradeType === "final"}
                className={clsx(s.results, {
                    [s.button]: activeGradeType !== "final",
                })}
            >
                {t("final")}
            </SwitchButton>
        </div>
    );
};
