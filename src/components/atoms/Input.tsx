import type { ChangeEventHandler } from "react";
import clsx from "clsx";

type InputType =
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "checkbox"
    | "radio"
    | "date"
    | "time"
    | "datetime-local"
    | "color"
    | "file";

type InputVariant = "primary" | "secondary" | "error" | "unstyled";

interface InputProps {
    type?: InputType;
    placeholder?: string;
    value: string | number | boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    variant?: InputVariant;
    className?: string;
}

export default function Input({
    type = "text",
    placeholder = "",
    value,
    onChange,
    variant = "primary",
    className,
}: InputProps) {
    const baseClasses = "px-3 py-2 border rounded transition-colors duration-200";

    const variantClasses = clsx({
        "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200": variant === "primary",
        "border-gray-400 focus:border-gray-600 focus:ring focus:ring-gray-200": variant === "secondary",
        "border-red-500 focus:border-red-700 focus:ring focus:ring-red-200": variant === "error",
        "border-none focus:ring-0": variant === "unstyled",
    });

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value as any} // untuk checkbox/radio
            onChange={onChange}
            className={clsx(baseClasses, variantClasses, className)}
        />
    );
}