type LinkTextProps = {
  href: string;
  children: React.ReactNode;
};

export default function LinkText({ href, children }: LinkTextProps) {
  return (
    <a href={href} className="text-blue-600 underline">
      {children}
    </a>
  );
}
