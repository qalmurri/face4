<<<<<<< HEAD
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea(props: TextAreaProps) {
    return (
        <textarea
            {...props}
            className={`w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ""}`}
        />
    );
=======
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea(props: TextAreaProps) {
    return (
        <textarea
            {...props}
            className={`w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ""}`}
        />
    );
>>>>>>> 98799ec143c4856c3699976639ee543fc90c3f79
}