import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface DropdownItemProps {
    children: ReactNode;
    to?: string;
    href?: string;
    onClick?: () => void;
}

export function DropdownItem({ children, to, href, onClick }: DropdownItemProps) {
    if (to) {
        return (
            <Link
                to={to}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                {children}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            {children}
        </button>
    );
}