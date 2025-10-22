//Biasanya dipakai untuk link yang lebih "tebal" maknanya → misalnya navigasi utama (<Link> ke halaman lain, button-like link).
//Bisa styled seperti tombol (primary, secondary, dsb).
//Contoh: link di navbar, CTA (Call to Action).

import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import clsx from "clsx";

type HyperlinkVariant = "primary" | "secondary" | "danger" | "unstyled";

interface HyperlinkProps {
    to: string;
    children: ReactNode;
    variant?: HyperlinkVariant;
    className?: string;
}

export function Hyperlink({
    to,
    children,
    variant = "primary",
    className,
}: HyperlinkProps) {
    const baseClasses = "transition-colors duration-200";

    const variantClasses = clsx({
        "text-blue-600 hover:text-blue-800": variant === "primary",
        "text-gray-600 hover:text-gray-800": variant === "secondary",
        "text-red-600 hover:text-red-800": variant === "danger",
        "": variant === "unstyled",
    });

    return (
        <Link to={to} className={clsx(baseClasses, variantClasses, className)}>
            {children}
        </Link>
    );
}