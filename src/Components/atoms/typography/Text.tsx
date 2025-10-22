import type { ReactNode, ElementType } from "react";

type TextVariant = "default" | "muted" | "caption" | "label";

interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  className?: string;
  as?: ElementType;
}

export default function Text({
  children,
  variant = "default",
  className,
  as: Component = "p",
}: TextProps) {
  const baseStyles: Record<TextVariant, string> = {
    default: "text-black",
    muted: "text-gray-400 text-sm",
    caption: "text-gray-500 text-xs uppercase tracking-wide",
    label: "text-gray-700 font-medium",
  };

  return (
    <Component className={`${baseStyles[variant]} ${className ?? ""}`}>
      {children}
    </Component>
  );
}


//<Text>Default body text</Text>
//<Text variant="muted">Muted description text</Text>
//<Text variant="caption">Small uppercase caption</Text>
//<Text variant="label" as="span" className="ml-2">Label inline</Text>