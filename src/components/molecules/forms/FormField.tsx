import Input from "../atoms/forms/Input";
import TextArea from "../atoms/forms/TextArea";

type FormFieldProps = {
    label: string;
    type?: "text" | "email" | "textarea";
    placeholder?: string;
};

export default function FormField({ label, type = "text", placeholder }: FormFieldProps) {
    return (
        <div>
            <label className="block font-medium mb-1">{label}</label>
            {type === "textarea" ? (
                <TextArea rows={5} placeholder={placeholder} />
            ) : (
                <Input type={type} placeholder={placeholder} />
            )}
        </div>
    );
}