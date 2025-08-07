import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { type FC, useEffect, useMemo, useState } from "react";

import { DiveTable } from "@/features/dive-table";

import { quartersStore } from "../model/quartersStore";
import { ProgressBlock } from "./ProgressBlock";
import styles from "./ProgressTable.module.scss";

export const ProgressTable: FC = observer(() => {
    const [isReady, setIsReady] = useState(false);
    const t = useTranslations("quarters");
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "keepSnaps",
    });

    const quarterIds = useMemo(
        () => ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "final"],
        []
    );

    const quarters = useMemo(
        () => quarterIds.map((id) => t(id)),
        [quarterIds, t]
    );

    useEffect(() => {
        const initializeData = async () => {
            // При монтировании сбрасываем состояние
            quartersStore.reset();
            // Загружаем данные за первую четверть
            await quartersStore.selectQuarter(0, quarterIds[0]);
            // Показываем анимацию только после загрузки данных
            setIsReady(true);
        };

        initializeData();

        // При размонтировании сбрасываем состояние
        return () => {
            quartersStore.reset();
            setIsReady(false);
        };
    }, [quarterIds]);

    return (
        <div className={clsx(styles.container, isReady && styles.ready)}>
            <div className={styles.carouselContainer} ref={emblaRef}>
                <div className={styles.carousel}>
                    {quarters.map((quarter, index) => (
                        <ProgressBlock
                            key={index}
                            value={quarter}
                            isSelected={
                                quartersStore.selectedQuarterIndex === index
                            }
                            onClick={() =>
                                quartersStore.selectQuarter(
                                    index,
                                    quarterIds[index]
                                )
                            }
                        />
                    ))}
                </div>
            </div>
            <DiveTable data={quartersStore.quarterData} />
        </div>
    );
});
