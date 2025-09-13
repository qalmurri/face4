<<<<<<< HEAD
type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Paragraph({ children, className }: ParagraphProps) {
  return <p className={`mb-4 ${className || ""}`}>{children}</p>;
}
=======
type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Paragraph({ children, className }: ParagraphProps) {
  return <p className={`mb-4 ${className || ""}`}>{children}</p>;
}
>>>>>>> 98799ec143c4856c3699976639ee543fc90c3f79
