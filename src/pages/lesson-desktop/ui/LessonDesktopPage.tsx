import { useTranslations } from "next-intl";
import React from "react";

import { type Lesson } from "@/entities/lesson";
import { UploadFiles } from "@/features/upload-files";
import DoubleArrowLeftIcon from "@/shared/icons/DoubleArrowLeft.svg";
import { type DayInfo } from "@/shared/lib/constants";
import { ActionButton } from "@/shared/ui/action-button/ActionButton";
import { LessonInfoDesktop } from "@/widgets/lesson-info-desktop";

import s from "./LessonDesktopPage.module.scss";

type Props = {
    lesson: Lesson;
    onClose?: () => void;
    day: DayInfo;
};

const LessonDesktopPage: React.FC<Props> = ({ lesson, onClose, day }) => {
    const t = useTranslations();
    return (
        <div className={s.root}>
            <div className={s.header}>
                {onClose && (
                    <button className={s.backButton} onClick={onClose}>
                        <DoubleArrowLeftIcon
                            width={28}
                            height={28}
                            viewBox="0 0 32 32"
                        />
                    </button>
                )}
                <div className={s.dayTitle}>{day.title}</div>
            </div>
            <LessonInfoDesktop lesson={lesson} dayTitle={day.title} />
            <div className={s.uploadSection}>
                <UploadFiles />
            </div>
            <div className={s.actions}>
                <ActionButton variant="primary" onClick={() => {}}>
                    {t("buttons.save")}
                </ActionButton>
                <ActionButton variant="alert" onClick={() => {}}>
                    {t("buttons.delete")}
                </ActionButton>
            </div>
        </div>
    );
};

export default LessonDesktopPage;
