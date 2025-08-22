"use client";
import "@/shared/styles/global.scss";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { match } from "ts-pattern";

import { PageTitle } from "@/shared/ui/page-title";
import { SwitchTabs } from "@/shared/ui/switch";
import { LoadsTable } from "@/widgets/loads-table";
import { NavBar } from "@/widgets/nav-bar-desktop";
import { PlansTable } from "@/widgets/plans-table";

import s from "./FileStoragePage.module.scss";

export default function Home() {
    const t = useTranslations();
    const [activeTab, setActiveTab] = useState("plan");

    return (
        <div className={s.container}>
            <div className={s.sidebar}>
                <NavBar />
            </div>

            <div className={s.topbar}>
                <PageTitle title={t("navigation.files")} />
                <SwitchTabs
                    variant="outlined"
                    tabs={[
                        { label: t("tabs.plan"), value: "plan" },
                        { label: t("tabs.load"), value: "load" },
                    ]}
                    active={activeTab}
                    onChange={setActiveTab}
                />
            </div>

            <div className={s.content}>
                {match({ activeTab })
                    .with({ activeTab: "plan" }, () => <PlansTable />)
                    .with({ activeTab: "load" }, () => <LoadsTable />)
                    .otherwise(() => null)}
            </div>
        </div>
    );
}

// Removed mock loadsData in favor of backend-connected LoadsTable
