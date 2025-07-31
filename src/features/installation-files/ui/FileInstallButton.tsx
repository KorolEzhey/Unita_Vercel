import InstallIcon from "@/shared/icons/Download.svg";
import FileIcon from "@/shared/icons/File.svg";
import { Button } from "@/shared/ui/button";
import s from "./FileInstallButton.module.scss";
import {
    buttonClassByResolution,
    iconSizeByResolution,
    installIconSizeByResolution,
    rightIconClassByResolution,
} from "./lookup-table";

type Resolution = "desktop" | "mobile";

type FileInstallButtonProps = {
    fileName: string;
    fileUrl: string;
    resolution: Resolution;
};

export const FileInstallButton = ({
    fileName,
    resolution,
}: FileInstallButtonProps) => {
    const handleInstallFile = () => {};

    return (
        <Button
            variant="text"
            onClick={handleInstallFile}
            className={buttonClassByResolution[resolution]}
            style={{ position: "relative" }}
        >
            <div className={s.content}>
                <FileIcon
                    className={s.leftIcon}
                    width={iconSizeByResolution[resolution]}
                    height={iconSizeByResolution[resolution]}
                    viewBox="0 0 32 32"
                />
                <span>{fileName}</span>
                <InstallIcon
                    className={rightIconClassByResolution[resolution]}
                    width={installIconSizeByResolution[resolution]}
                    height={installIconSizeByResolution[resolution]}
                    viewBox="0 0 32 32"
                />
            </div>
        </Button>
    );
};
