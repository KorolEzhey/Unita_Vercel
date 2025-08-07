import type { FC, ReactNode } from "react";

import styles from "./Spinner.module.scss";

export const Spinner: FC = () => <div className={styles.spinner} />;

export const SpinnerWrapper: FC<{ children?: ReactNode }> = ({ children }) => (
    <div className={styles.spinnerWrapper}>
        <Spinner />
        {children}
    </div>
);
