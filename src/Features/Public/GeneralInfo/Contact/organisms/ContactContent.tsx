import Text from "../../../../../Components/Atoms/Typography/Text";
import {GeneralButton, Heading} from "../../../../../Components/Atoms";
import FormField from "../../../../../Components/Molecules/Forms/FormField";
import ContactInfo from "../molecules/ContactInfo";

export default function ContactContent() {
    return (
      <div className="max-w-4xl mx-auto p-6 text-gray-800">
        <Heading level={1} className="text-3xl font-bold mb-6">
          Contact Us
        </Heading>

        <Text>
          Jika Anda memiliki pertanyaan, saran, atau membutuhkan bantuan,
          silakan hubungi kami melalui formulir di bawah ini atau gunakan
          informasi kontak yang tersedia.
        </Text>

        {/* Contact Form */}
        <form className="space-y-4">
          <FormField label="Nama" placeholder="Masukkan nama Anda" />
          <FormField
            label="Email"
            type="email"
            placeholder="Masukkan email Anda"
          />
          <FormField
            label="Pesan"
            type="textarea"
            placeholder="Tulis pesan Anda..."
          />

          <GeneralButton type="submit">Kirim</GeneralButton>
        </form>

        {/* Contact Info */}
        <ContactInfo />
      </div>
    );
}