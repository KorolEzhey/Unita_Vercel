import { useTranslations } from 'next-intl';

import InstallIcon from '@/shared/icons/Download.svg';
import FileIcon from '@/shared/icons/File.svg';
import { Button } from '@/shared/ui/button';

import s from './FileInstallButton.module.scss';

interface FileInstallButtonProps {
  fileName: string;
  fileUrl: string;
}

export const FileInstallButton = ({ fileName }: FileInstallButtonProps) => {
  const handleInstallFile = () => {};

  return (
    <Button
      variant="text"
      onClick={handleInstallFile}
      className={s.button}
      style={{ position: 'relative' }}
    >
      <div className={s.content}>
        <FileIcon
          className={s.leftIcon}
          width={28}
          height={28}
          viewBox="0 0 32 32"
        />
        <span>{fileName}</span>
        <InstallIcon
          className={s.rightIcon}
          width={20}
          height={28}
          viewBox="0 0 32 32"
        />
      </div>
    </Button>
  );
};
