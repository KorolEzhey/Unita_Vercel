"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useUser } from "@/entities/user";
import EyeOpen from "@/shared/icons/Eye.svg";
import EyeClosed from "@/shared/icons/Eye2.svg";
import { SpinnerWrapper } from "@/shared/ui";
import { Button } from "@/shared/ui/button";

import { useAuth } from "../model/useAuth";
import styles from "./LoginForm.module.scss";

type FormValues = {
    login: string;
    password: string;
};

export function LoginForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const t = useTranslations("auth");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError: setFormError,
    } = useForm<FormValues>();

    const { login, isLoading } = useAuth();

    const router = useRouter();
    const { refetch: refetchUser } = useUser();

    const onSubmit = async (data: FormValues) => {
        login(
            {
                login: data.login,
                password: data.password,
            },
            {
                onSuccess: async () => {
                    const { data: user } = await refetchUser();
                    if (user?.role === "STUDENT") {
                        router.push("/schedule");
                    } else if (
                        user?.role === "TEACHER" ||
                        user?.role === "ADMIN"
                    ) {
                        router.push("/schedule-desktop");
                    }
                },
                onError: () => {
                    setFormError("login", {
                        type: "manual",
                        message: t("errors.loginError"),
                    });
                },
            }
        );
    };

    return (
        <div className={styles.formWrapper}>
            <div>
                <h2 className={styles.title}>{t("title")}</h2>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="login" className={styles.srOnly}>
                            {t("login")}
                        </label>
                        <input
                            id="login"
                            type="text"
                            className={styles.input}
                            placeholder={t("login")}
                            {...register("login", {
                                required: t("errors.emptyFields"),
                            })}
                        />
                        {errors.login && (
                            <div className={styles.errorMessage}>
                                {errors.login.message}
                            </div>
                        )}
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="password" className={styles.srOnly}>
                            {t("password")}
                        </label>
                        <div className={styles.passwordInput}>
                            <input
                                id="password"
                                type={isPasswordVisible ? "text" : "password"}
                                className={styles.input}
                                placeholder={t("password")}
                                {...register("password", {
                                    required: t("errors.emptyFields"),
                                })}
                            />
                            <button
                                type="button"
                                className={styles.eyeButton}
                                onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                }
                            >
                                {isPasswordVisible ? (
                                    <EyeOpen
                                        width={24}
                                        height={24}
                                        viewBox="0 0 32 32"
                                    />
                                ) : (
                                    <EyeClosed
                                        width={24}
                                        height={24}
                                        viewBox="0 0 32 32"
                                    />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <div className={styles.errorMessage}>
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        fullWidth
                        variant="primary"
                        className={styles.roundedButton}
                    >
                        {isLoading ? (
                            <SpinnerWrapper>{t("loading")}</SpinnerWrapper>
                        ) : (
                            t("submit")
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
