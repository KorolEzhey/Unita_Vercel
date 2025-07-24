'use client';

import capitalize from 'capitalize';
import clsx from 'clsx';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel, {
  type EmblaViewportRefType,
} from 'embla-carousel-react';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CALENDAR } from '@/shared/lib/constants';

import { calendarStore } from '../model/calendarStore';
import { DateBlock } from './DateBlock';
import styles from './StudentCalendar.module.scss';

type StudentCalendarProps = {
  className?: string;
};

export const StudentCalendar = observer(
  ({ className: _className }: StudentCalendarProps) => {
    const t = useTranslations('calendar');
    const [isReady, setIsReady] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({
      align: 'start',
      dragFree: true,
      containScroll: 'keepSnaps',
    });

    const prevMonthRef = useRef<number>(calendarStore.currentDate.getMonth());

    const calculateMonthCounts = (
      visibleDates: Date[]
    ): Record<number, number> => {
      return visibleDates.reduce(
        (acc, date) => {
          const month = date.getMonth();
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        },
        {} as Record<number, number>
      );
    };

    const findDominantMonth = (monthCounts: Record<number, number>): number => {
      return Number(
        Object.entries(monthCounts).reduce((a, b) =>
          monthCounts[Number(a[0])] > monthCounts[Number(b[0])] ? a : b
        )[0]
      );
    };

    const updateCurrentMonth = useCallback((api: EmblaCarouselType) => {
      if (!api) return;

      const visibleSlides = api.slidesInView();
      const visibleDates = visibleSlides.map(
        (index) => calendarStore.dates[index]
      );
      const monthCounts = calculateMonthCounts(visibleDates);
      const currentMonth = findDominantMonth(monthCounts);

      if (prevMonthRef.current !== currentMonth) {
        prevMonthRef.current = currentMonth;
        const newDate = new Date(
          CALENDAR.FIXED_DATE.getFullYear(),
          currentMonth,
          1
        );
        calendarStore.setCurrentDate(newDate);
      }
    }, []);

    const setupCarousel = useCallback(() => {
      if (!emblaApi) return;

      const scrollTimeout = setTimeout(() => {
        emblaApi.scrollTo(CALENDAR.INITIAL_SCROLL_INDEX, true);
        setIsReady(true);
      }, CALENDAR.SCROLL_TIMEOUT);

      return scrollTimeout;
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;

      emblaApi.on('scroll', () => updateCurrentMonth(emblaApi));
      const scrollTimeout = setupCarousel();

      return () => {
        emblaApi.off('scroll', () => updateCurrentMonth(emblaApi));
        clearTimeout(scrollTimeout);
        setIsReady(false);
        calendarStore.resetDate();
      };
    }, [emblaApi, updateCurrentMonth, setupCarousel]);

    return (
      <div
        className={clsx(styles.calendar, {
          [styles.calendarReady]: isReady,
        })}
      >
        <MonthHeader month={calendarStore.currentDate.getMonth()} t={t} />
        <CarouselView emblaRef={emblaRef} dates={calendarStore.dates} />
      </div>
    );
  }
);

const MonthHeader = ({
  month,
  t,
}: {
  month: number;
  t: (key: string) => string;
}) => <h2 className={styles.month}>{capitalize(t(`months.long.${month}`))}</h2>;
const CarouselView = ({
  emblaRef,
  dates,
}: {
  emblaRef: EmblaViewportRefType;
  dates: Date[];
}) => (
  <div className={styles.carouselWrapper} ref={emblaRef}>
    <div className={styles.carouselContainer}>
      {dates.map((date, index) => (
        <DateBlock key={index} date={date} index={index} />
      ))}
    </div>
  </div>
);
