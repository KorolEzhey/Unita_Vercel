import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { observer } from "mobx-react-lite";
import { type FC, useEffect, useState } from "react";

import { DiveTable } from "@/features/dive-table";

import { modulesStore } from "../model/modulesStore";
import { ProgressBlock } from "./ProgressBlock";
import styles from "./ProgressTable.module.scss";

type ProgressTableProps = {
    classId?: number;
};

export const ProgressTable: FC<ProgressTableProps> = observer(
    ({ classId = 5 }) => {
        const [isReady, setIsReady] = useState(false);
        const [emblaRef] = useEmblaCarousel({
            align: "start",
            dragFree: true,
            containScroll: "keepSnaps",
        });

        useEffect(() => {
            console.log("🚀 ProgressTable: Инициализация с classId:", classId);

            const initializeData = async () => {
                modulesStore.reset();
                await modulesStore.fetchModulesByClass(classId);
                setIsReady(true);
            };

            initializeData();

            return () => {
                modulesStore.reset();
                setIsReady(false);
            };
        }, [classId]);

        // Преобразуем данные модулей в формат для DiveTable
        const diveTableData =
            modulesStore.studentDiveGrades.map((diveGrade, index) => {
                const mark = diveGrade.score !== null ? diveGrade.score : -1;
                return {
                    week: modulesStore.isFinalMode
                        ? diveGrade.subjectName // Используем название модуля
                        : (index + 1).toString(),
                    subject: modulesStore.isFinalMode
                        ? "" // В режиме итога убираем колонку предмет
                        : diveGrade.subjectName,
                    mark: mark, // Используем -1 для null
                    actions: "",
                };
            }) || [];

        console.log("📊 ProgressTable: Состояние:", {
            isReady,
            moduleNames: modulesStore.moduleNames,
            selectedModuleIndex: modulesStore.selectedModuleIndex,
            selectedModule: modulesStore.selectedModule,
            diveTableData,
            isLoading: modulesStore.isLoading,
            isLoadingGrades: modulesStore.isLoadingGrades,
            error: modulesStore.error,
        });

        // Показываем loading только при первой загрузке модулей
        if (!isReady || modulesStore.isLoading) {
            return (
                <div className={styles.container}>
                    <div>Загрузка модулей...</div>
                </div>
            );
        }

        if (modulesStore.error) {
            return (
                <div className={styles.container}>
                    <div>Ошибка: {modulesStore.error}</div>
                </div>
            );
        }

        if (modulesStore.moduleNames.length === 0) {
            return (
                <div className={styles.container}>
                    <div>Модули не найдены</div>
                </div>
            );
        }

        return (
            <div className={clsx(styles.container, isReady && styles.ready)}>
                <div className={styles.carouselContainer} ref={emblaRef}>
                    <div className={styles.carousel}>
                        {modulesStore.moduleNames.map((moduleName, index) => (
                            <ProgressBlock
                                key={index}
                                value={moduleName}
                                isSelected={
                                    modulesStore.selectedModuleIndex === index
                                }
                                onClick={() =>
                                    modulesStore.selectModule(index, 8)
                                }
                            />
                        ))}
                        <ProgressBlock
                            key="final"
                            value="Итог"
                            isSelected={modulesStore.isFinalMode}
                            onClick={() => modulesStore.selectFinalMode(8)}
                        />
                    </div>
                </div>

                <DiveTable
                    data={diveTableData}
                    isFinalMode={modulesStore.isFinalMode}
                />
            </div>
        );
    }
);
