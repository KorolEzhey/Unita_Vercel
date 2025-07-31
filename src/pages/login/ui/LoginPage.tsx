"use client";

import { useRouter } from "next/navigation";

import { LoginForm } from "@/features/auth";

import styles from "./LoginPage.module.scss";

export default function LoginPage() {
    const router = useRouter();

    const handleLoginSuccess = () => {
        router.push("/schedule");
    };

    return (
        <div className={styles.loginContainer}>
            <LoginForm onSuccess={handleLoginSuccess} />
        </div>
    );
}
