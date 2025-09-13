<<<<<<< HEAD
import Heading from "../atoms/Heading";
import Paragraph from "../atoms/Paragraph";

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
=======
import Heading from "../atoms/Heading";
import Paragraph from "../atoms/Paragraph";

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
>>>>>>> 98799ec143c4856c3699976639ee543fc90c3f79
}