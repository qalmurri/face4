type InputCopyProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function InputCopy(props: InputCopyProps) {
    return (
        <input
            {...props}
            className={`w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ""}`}
        />
    );
}