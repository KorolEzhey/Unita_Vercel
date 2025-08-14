import React from "react";

import styles from "./Spinner.module.scss";

export const Spinner: React.FC = () => <div className={styles.spinner} />;

export const SpinnerWrapper: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => (
    <div className={styles.spinnerWrapper}>
        <Spinner />
        {children}
    </div>
);
