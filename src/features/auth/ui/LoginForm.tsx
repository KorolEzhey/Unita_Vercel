"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import EyeOpen from "@/shared/icons/Eye.svg";
import EyeClosed from "@/shared/icons/Eye2.svg";
import { Button } from "@/shared/ui/button";
import { SpinnerWrapper } from "@/shared/ui/spinner/Spinner";
import { LangSwitcher } from "./LangSwitcher";

import styles from "./LoginForm.module.scss";

type LoginFormProps = {
    onSuccess: () => void;
};

type FormValues = {
    login: string;
    password: string;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations("auth");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError: setFormError,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        try {
            setIsLoading(true);
            // TODO: Реализовать API запрос для аутентификации
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация запроса
            onSuccess();
        } catch {
            setFormError("login", {
                type: "manual",
                message: t("errors.loginError"),
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.formWrapper}>
            <LangSwitcher />
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
