"use client";

import { useEffect, useState } from "react";

export function StyleProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div
            style={{
                visibility: mounted ? "visible" : "hidden",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.3s ease-in",
            }}
        >
            {children}
        </div>
    );
}
