import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

type GeneralButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";

  disabled?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "ghost"
    | "success"
    | "warning"
    | "outline"
    | "gradient"
    | "neon"
    | "soft"
    | "glass"
    | "link"
    | "dark";
  to?: string;
  href?: string;
  className?: string;
};

export default function GeneralButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  to,
  href,
  className,
}: GeneralButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300",
    ghost:
      "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300 disabled:text-gray-400",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300",
    warning:
      "bg-yellow-500 text-black hover:bg-yellow-600 focus:ring-yellow-400 disabled:bg-yellow-200",
    outline:
      "border border-gray-400 text-gray-800 hover:bg-gray-100 focus:ring-gray-400 disabled:text-gray-400 disabled:border-gray-300",
    gradient:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:ring-pink-400 disabled:opacity-50",
    neon: "bg-black text-green-400 border border-green-400 hover:bg-green-400 hover:text-black focus:ring-green-500 shadow-[0_0_10px_#22c55e] disabled:opacity-50",
    soft: "bg-pink-100 text-pink-700 hover:bg-pink-200 focus:ring-pink-300 disabled:bg-pink-50",
    glass:
      "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 focus:ring-white/40 disabled:opacity-50",
    link: "bg-transparent text-blue-600 underline hover:text-blue-800 focus:ring-blue-400 disabled:text-blue-300",
    dark: "bg-gray-900 text-gray-100 hover:bg-gray-800 focus:ring-gray-700 disabled:bg-gray-700 disabled:text-gray-400",
  };

  const classes = clsx(baseClasses, variantClasses[variant], className);
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}>
      {children}
    </button>
  );
}

// <Button onClick={() => alert("Clicked!")}>Klik Saya</Button>
// <Button to="/dashboard">Dashboard</Button>
// <Button href="https://google.com">Google</Button>