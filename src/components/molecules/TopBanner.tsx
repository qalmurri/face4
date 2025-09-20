import type { ReactNode } from "react";
import clsx from "clsx";

import { useTimedVisibility } from "../../hooks";
import { GeneralButton } from "../atoms";

interface TopBannerProps {
    children: ReactNode;
    variant?: "info" | "success" | "warning" | "danger" | "dark";
    storageKey?: string;
    time?: number;
}

export default function TopBanner({
    children,
    variant = "info",
    storageKey = "topnavbar_closed",
    time = 12 * 60 * 60 * 1000,
}: TopBannerProps) {
    const duration = time;

    // hook
    const { isVisible, handleClose } = useTimedVisibility(storageKey, duration);
    if (isVisible === null) return null;
    if (!isVisible) return null;

    return (
      <div
        className={clsx(
          "flex items-center justify-between px-4 py-2 text-sm",
          variant === "info" && "bg-blue-500 text-white",
          variant === "success" && "bg-green-500 text-white",
          variant === "warning" && "bg-yellow-500 text-black",
          variant === "danger" && "bg-red-600 text-white",
          variant === "dark" && "bg-gray-800 text-white"
        )}>
        <div>{children}</div>
        <GeneralButton onClick={handleClose}>x</GeneralButton>
      </div>
    );
}