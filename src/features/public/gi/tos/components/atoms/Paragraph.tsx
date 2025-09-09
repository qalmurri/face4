type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Paragraph({ children, className }: ParagraphProps) {
  return <p className={`mb-4 ${className || ""}`}>{children}</p>;
}
