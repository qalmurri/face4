import type { ReactNode } from "react";
import clsx from "clsx";

type LabelVariant = "primary" | "secondary" | "error" | "unstyled";

interface LabelProps {
    children: ReactNode;
    htmlFor: string;
    variant?: LabelVariant;
    className?: string;
}

export default function Label({
    children,
    htmlFor,
    variant = "primary",
    className,
}: LabelProps) {
    const baseClasses = "block text-sm font-medium";

    const variantClasses = clsx({
        "text-gray-700": variant === "primary",
        "text-gray-500": variant === "secondary",
        "text-red-600": variant === "error",
        "": variant === "unstyled",
    });

    return (
        <label htmlFor={htmlFor} className={clsx(baseClasses, variantClasses, className)}>
            {children}
        </label>
    );
}