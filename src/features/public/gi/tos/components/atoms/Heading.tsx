import React from "react";

type HeadingProps = {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
};

export default function Heading({
  level = 1,
  children,
  className,
}: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  const styles =
    level === 1
      ? "text-3xl font-bold mb-6"
      : level === 2
      ? "text-2xl font-semibold mt-6 mb-3"
      : "text-xl font-medium mb-2";

  return <Tag className={`${styles} ${className || ""}`}>{children}</Tag>;
}