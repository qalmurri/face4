import { Heading } from "../../../../../../Components/Atoms";
import Text from "../../../../../../Components/Atoms/Typography/Text";

export default function ContactInfo() {
    return (
        <div className="mt-10">
            <Heading level={2} className="text-2xl font-semibold mb-3">
                Informasi Kontak
            </Heading>
            <Text>📍 Alamat: Jl. Contoh No.123, Jakarta, Indonesia</Text>
            <Text>📧 Email: support@example.com</Text>
            <Text>📞 Telepon: +62 000-0000-0000</Text>
        </div >
    );
}