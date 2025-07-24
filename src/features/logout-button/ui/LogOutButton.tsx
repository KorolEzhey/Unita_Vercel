import { useTranslations } from 'next-intl';

import LogoutIcon from '@/shared/icons/Logout.svg';
import { Button } from '@/shared/ui/button';

import s from './LogOutButton.module.scss';

export const LogOutButton = () => {
  const t = useTranslations();
  const handleLogout = () => {
    // TODO: Реализовать логаут
    console.warn('Выход из аккаунта');
  };

  return (
    <Button variant="text" onClick={handleLogout} className={s.button}>
      <div className={s.content}>
        <div className={s.iconWrapper}>
          <LogoutIcon
            className={s.icon}
            width="32"
            height="32"
            viewBox="0 0 32 32"
          />
        </div>
        <span>{t('buttons.logout')}</span>
      </div>
    </Button>
  );
};
