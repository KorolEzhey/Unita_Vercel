"use client";
import "@/shared/styles/global.scss";

import { NavBar } from "@/widgets/nav-bar";

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
            <div style={{ flex: 1 }} />
            <NavBar />
        </div>
    );
}
