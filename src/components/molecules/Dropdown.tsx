import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import DropdownItem from "../atoms/DropdownItem";

interface DropdownMenuProps {
    trigger: ReactNode;
    items: { label: string; to?: string; href?: string; onClick?: () => void }[];
    align?: "left" | "right";
    openOnHover?: boolean;
}

export default function DropdownMenu({
    trigger,
    items,
    align = "left",
    openOnHover = true,
}: DropdownMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Tutup menu kalau klik di luar
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={menuRef}
            className="relative inline-block text-left"
            onMouseEnter={() => openOnHover && setOpen(true)}
            onMouseLeave={() => openOnHover && setOpen(false)}
        >
            {/* Trigger */}
            <div
                onClick={() => !openOnHover && setOpen(!open)}
                className="cursor-pointer select-none"
            >
                {trigger}
            </div>

            {/* Menu */}
            {open && (
                <div
                    className={clsx(
                        "absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50",
                        align === "right" ? "right-0" : "left-0"
                    )}
                >
                    <div className="py-1">
                        {items.map((item, idx) => (
                            <DropdownItem
                                key={idx}
                                to={item.to}
                                href={item.href}
                                onClick={item.onClick}
                            >
                                {item.label}
                            </DropdownItem>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}