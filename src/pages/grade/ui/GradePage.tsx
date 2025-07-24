"use client";
import "@/shared/styles/global.scss";

import { GradeList } from "@/widgets/grade-list";
import { NavBar } from "@/widgets/nav-bar";
import { ProgressTable } from "@/widgets/progress-table";

export default function Home() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <GradeList />
            <ProgressTable />
            <div style={{ flex: 1 }} />
            <NavBar />
        </div>
    );
}
