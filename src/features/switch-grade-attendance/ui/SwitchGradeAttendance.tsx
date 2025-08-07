import { useTranslations } from "next-intl";
import s from "./SwitchGradeAttendance.module.scss";
import { Tab } from "@/pages/grade-book-desktop/ui/GradeBookPageDesktop";
import { SwitchButton } from "@/shared/ui/switch";

type SwitchGradeAttendanceProps = {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
};

export const SwitchGradeAttendance = ({
    activeTab,
    setActiveTab,
}: SwitchGradeAttendanceProps) => {
    const t = useTranslations("navigation");

    return (
        <div className={s.wrapper}>
            <SwitchButton
                onClick={() => setActiveTab("grades")}
                isActive={activeTab === "grades"}
                className={s.grades}
            >
                {t("grade")}
            </SwitchButton>
            <SwitchButton
                onClick={() => setActiveTab("attendance")}
                isActive={activeTab === "attendance"}
                className={s.attendance}
            >
                {t("attendance")}
            </SwitchButton>
        </div>
    );
};
