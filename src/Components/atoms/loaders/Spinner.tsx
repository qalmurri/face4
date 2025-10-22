type LoaderProps = {
  size?: number; // px
  className?: string;
};

export default function Spinner({ size = 16, className }: LoaderProps) {
  return (
    <span
      className={`animate-spin border-2 border-current border-t-transparent rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
