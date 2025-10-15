import {Heading} from "../Atoms/Typography/Heading";
import Text from "../Atoms/Typography/Text";

type FaqItemProps = {
    question: string;
    answer: string;
};

export default function FaqItem({ question, answer }: FaqItemProps) {
    return (
        <div className="border-b pb-4">
            <Heading level={2} className="text-xl font-semibold mb-2">
                {question}
            </Heading>
            <Text>{answer}</Text>
        </div>
    );
}