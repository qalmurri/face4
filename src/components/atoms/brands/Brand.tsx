interface BrandProps {
    children: React.ReactNode;
}

export function Brand({ children }: BrandProps) {
    return <div className="text-lg font-bold">{children}</div>;
}