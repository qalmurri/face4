import {Heading, Paragraph} from "../../atoms";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <div>
      <Heading level={2}>{title}</Heading>
      <Paragraph>{children}</Paragraph>
    </div>
  );
}