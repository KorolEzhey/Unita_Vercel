import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';
import { type FC, useEffect, useState } from 'react';

import { gradeStore } from '../model/gradeStore';
import { GradeBlock } from './GradeBlock';
import styles from './GradeList.module.scss';

export const GradeList: FC = observer(() => {
  const t = useTranslations('navigation');
  const [isReady, setIsReady] = useState(false);
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'keepSnaps',
  });

  useEffect(() => {
    const fetchData = async () => {
      await gradeStore.fetchGrades();
      setIsReady(true);
    };
    fetchData();
  }, []);

  return (
    <div className={clsx(styles.container, isReady && styles.ready)}>
      <h2 className={styles.title}>{t('grade')}</h2>
      <div className={styles.carouselContainer} ref={emblaRef}>
        <div className={styles.carousel}>
          {!gradeStore.isLoading && (
            <>
              {gradeStore.error ? (
                <div>{gradeStore.error}</div>
              ) : (
                gradeStore.sortedGrades.map((grade) => (
                  <GradeBlock
                    key={grade.id}
                    grade={grade.grade}
                    subject={grade.subject}
                    week={grade.week}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});
