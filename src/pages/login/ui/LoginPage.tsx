"use client";

import { LoginForm } from "@/features/auth";

import styles from "./LoginPage.module.scss";

export default function LoginPage() {
    return (
        <div className={styles.loginContainer}>
            <LoginForm />
        </div>
    );
}
