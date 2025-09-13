<<<<<<< HEAD
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";

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
=======
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";

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
>>>>>>> 98799ec143c4856c3699976639ee543fc90c3f79
}