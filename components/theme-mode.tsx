"use client"; // Important

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration errors by waiting for the client to mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Avoid rendering until mounted

    return (
        <Button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className={`  ${resolvedTheme === "dark" ? "bg-gray-800 hover:bg-gray-800  text-white" : "bg-[#3182ce] hover:bg-[#3182ce]"
                }`}
        >
            {resolvedTheme === "dark" ? (
                <Moon size={20} />
            ) : (
                <Sun size={20} />
            )}
        </Button>
    );
}
