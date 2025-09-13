<<<<<<< HEAD
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
=======
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
>>>>>>> 98799ec143c4856c3699976639ee543fc90c3f79
}