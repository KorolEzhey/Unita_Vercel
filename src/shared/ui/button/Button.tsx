import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import s from '@/shared/ui/button/Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon,
  fullWidth,
  children,
  className,
  ...props
}) => (
  <button
    type="button"
    className={clsx(
      s.button,
      s[variant],
      s[size],
      {
        [s.fullWidth]: fullWidth,
      },
      className
    )}
    {...props}
  >
    {icon && <span className={s.icon}>{icon}</span>}
    <span className={s.Text}>{children}</span>
  </button>
);
