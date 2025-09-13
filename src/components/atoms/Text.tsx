interface TextProps {
    children: React.ReactNode;
    muted?: boolean;
}

export default function Text({ children, muted = false }: TextProps) {
    return (
        <p className={muted ? "text-gray-400 text-sm" : "text-black"}>
            {children}
        </p>
    );
}