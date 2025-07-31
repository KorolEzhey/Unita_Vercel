import { FC } from "react";
import s from "./PageTitle.module.scss";

type PageTitleProps = { title: string };

export const PageTitle: FC<PageTitleProps> = ({ title }) => (
    <h1 className={s.title}>{title}</h1>
);
