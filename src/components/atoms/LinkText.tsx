<<<<<<< HEAD
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
=======
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
>>>>>>> 98799ec143c4856c3699976639ee543fc90c3f79
