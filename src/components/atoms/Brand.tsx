interface BrandProps {
    children: React.ReactNode;
}

export default function Brand({ children }: BrandProps) {
    return <div className="text-lg font-bold">{children}</div>;
}