<<<<<<< HEAD
import Heading from "../../../../../components/atoms/Heading";
import LinkText from "../../../../../components/atoms/LinkText";
import FaqItem from "../../../../../components/molecules/FaqItem";

export default function FaqContent() {
    const faqs = [
        {
            question: "Apa itu layanan ini?",
            answer:
                "Ini adalah platform yang menyediakan informasi dan layanan untuk membantu pengguna mengelola kebutuhan mereka secara online.",
        },
        {
            question: "Apakah layanan ini gratis?",
            answer:
                "Sebagian fitur dapat digunakan secara gratis. Namun, ada fitur premium yang memerlukan biaya berlangganan.",
        },
        {
            question: "Bagaimana cara membuat akun?",
            answer:
                "Anda bisa membuat akun dengan klik tombol Register di menu atas, lalu isi formulir dengan data diri Anda.",
        },
        {
            question: "Bagaimana jika saya lupa password?",
            answer:
                "Klik tombol 'Lupa Password' di halaman login, lalu ikuti instruksi untuk mereset password Anda melalui email.",
        },
        {
            question: "Bagaimana cara menghubungi tim support?",
            answer:
                "Anda bisa menghubungi kami melalui halaman Contact, atau kirim email langsung ke support@example.com.",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 text-gray-800">
            <Heading level={1}>Frequently Asked Questions (FAQ)</Heading>

            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>

            <p className="mt-8 text-gray-500">
                Masih ada pertanyaan lain? Silakan kunjungi halaman{" "}
                <LinkText href="/contact">Contact</LinkText> untuk menghubungi tim kami.
            </p>
        </div>
    );
=======
import Heading from "../../../../../components/atoms/Heading";
import LinkText from "../../../../../components/atoms/LinkText";
import FaqItem from "../../../../../components/molecules/FaqItem";

export default function FaqContent() {
    const faqs = [
        {
            question: "Apa itu layanan ini?",
            answer:
                "Ini adalah platform yang menyediakan informasi dan layanan untuk membantu pengguna mengelola kebutuhan mereka secara online.",
        },
        {
            question: "Apakah layanan ini gratis?",
            answer:
                "Sebagian fitur dapat digunakan secara gratis. Namun, ada fitur premium yang memerlukan biaya berlangganan.",
        },
        {
            question: "Bagaimana cara membuat akun?",
            answer:
                "Anda bisa membuat akun dengan klik tombol Register di menu atas, lalu isi formulir dengan data diri Anda.",
        },
        {
            question: "Bagaimana jika saya lupa password?",
            answer:
                "Klik tombol 'Lupa Password' di halaman login, lalu ikuti instruksi untuk mereset password Anda melalui email.",
        },
        {
            question: "Bagaimana cara menghubungi tim support?",
            answer:
                "Anda bisa menghubungi kami melalui halaman Contact, atau kirim email langsung ke support@example.com.",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 text-gray-800">
            <Heading level={1}>Frequently Asked Questions (FAQ)</Heading>

            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>

            <p className="mt-8 text-gray-500">
                Masih ada pertanyaan lain? Silakan kunjungi halaman{" "}
                <LinkText href="/contact">Contact</LinkText> untuk menghubungi tim kami.
            </p>
        </div>
    );
>>>>>>> 98799ec143c4856c3699976639ee543fc90c3f79
}