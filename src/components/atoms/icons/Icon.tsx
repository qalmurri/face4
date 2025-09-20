interface IconProps {
    children: React.ReactNode; // bisa pakai lucide-react, fontawesome dll
}

export function Icon({ children }: IconProps) {
    return <span className="inline-flex items-center">{children}</span>;
}