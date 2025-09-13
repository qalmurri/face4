import { useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";

import Brand from "../../atoms/brands/Brand";
import HamburgerButton from "../../atoms/buttons/Hamburger";

interface NavbarProps {
    brand?: ReactNode;
    children: ReactNode;
    variant?: "default" | "sticky" | "transparent" | "dark";
}

export default function Navbar({ brand, children, variant = "default" }: NavbarProps) {
    const [open, setOpen] = useState(false);

    return (
        <nav
            className={clsx(
                "flex items-center justify-between px-4 py-1",
                "md:flex-row md:items-center md:justify-between",
                variant === "default" && "bg-white shadow text-black",
                variant === "sticky" && "sticky top-0 bg-white shadow-md z-50 text-black",
                variant === "transparent" && "bg-transparent text-white",
                variant === "dark" && "bg-gray-900 text-white"
            )}
        >
            <div className="flex items-center justify-between w-full md:w-auto">
                {brand && <Brand>{brand}</Brand>}
                <HamburgerButton onClick={() => setOpen(!open)} />
            </div>

            <div
                className={clsx(
                    "flex flex-col gap-2 mt-2 md:mt-0 md:flex md:flex-row md:items-center md:gap-4",
                    open ? "block" : "hidden md:flex"
                )}
            >
                {children}
            </div>
        </nav>
    );
}