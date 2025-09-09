export default function Faq() {
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
      <h1 className="text-3xl font-bold mb-6">
        Frequently Asked Questions (FAQ)
      </h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-gray-500">
        Masih ada pertanyaan lain? Silakan kunjungi halaman{" "}
        <a href="/contact" className="text-blue-600 underline">
          Contact
        </a>{" "}
        untuk menghubungi tim kami.
      </p>
    </div>
  );
}
