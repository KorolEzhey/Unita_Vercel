"use client";
import "@/shared/styles/global.scss";

import { NavBar } from "@/widgets/nav-bar";

export default function Home() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "var(--light-color)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div>
                <NavBar />
            </div>
        </div>
    );
}
