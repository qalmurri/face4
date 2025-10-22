interface HamburgerButtonProps {
    onClick: () => void;
}

export function Hamburger({ onClick }: HamburgerButtonProps) {
    return (
        <button className="md:hidden p-2 focus:outline-none" onClick={onClick}>
            <span className="block w-6 h-0.5 bg-current mb-1"></span>
            <span className="block w-6 h-0.5 bg-current mb-1"></span>
            <span className="block w-6 h-0.5 bg-current"></span>
        </button>
    );
}