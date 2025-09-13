import Heading from "../../../../../components/atoms/typography/Heading";
import Paragraph from "../../../../../components/atoms/typography/Paragraph";
import LinkText from "../../../../../components/atoms/typography/LinkText";
import Section from "../../../../../components/molecules/Section";

export default function TermsOfServiceContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
      <Heading level={1}>Terms of Service</Heading>

      <Paragraph>
        Selamat datang di website kami. Dengan mengakses atau menggunakan
        layanan ini, Anda dianggap setuju untuk terikat dengan syarat dan
        ketentuan berikut. Jika Anda tidak menyetujui, harap jangan gunakan
        layanan kami.
      </Paragraph>

      <Section title="1. Penggunaan Layanan">
        Anda setuju untuk menggunakan layanan hanya untuk tujuan yang sah sesuai
        hukum dan tidak melanggar hak pihak ketiga. Aktivitas yang merugikan,
        menipu, atau merusak sistem tidak diperbolehkan.
      </Section>

      <Section title="2. Akun Pengguna">
        Jika Anda membuat akun, Anda bertanggung jawab untuk menjaga kerahasiaan
        informasi login dan semua aktivitas yang terjadi di akun Anda. Segera
        beri tahu kami jika ada akses tidak sah atau pelanggaran keamanan.
      </Section>

      <Section title="3. Konten">
        Semua konten yang tersedia di layanan ini adalah milik kami atau mitra
        kami dan dilindungi oleh hak cipta. Anda tidak diperbolehkan menyalin,
        mendistribusikan, atau memodifikasi konten tanpa izin tertulis.
      </Section>

      <Section title="4. Pembatasan Tanggung Jawab">
        Kami tidak bertanggung jawab atas kerugian langsung maupun tidak
        langsung yang timbul dari penggunaan layanan ini. Layanan disediakan
        "sebagaimana adanya" tanpa jaminan apa pun.
      </Section>

      <Section title="5. Perubahan Syarat">
        Kami berhak untuk memperbarui atau mengubah syarat ini kapan saja.
        Perubahan akan berlaku segera setelah dipublikasikan di halaman ini.
        Anda disarankan untuk meninjau syarat ini secara berkala.
      </Section>

      <Section title="6. Hukum yang Berlaku">
        Syarat dan ketentuan ini diatur oleh hukum yang berlaku di Indonesia.
        Segala sengketa akan diselesaikan melalui jalur hukum sesuai peraturan
        yang berlaku.
      </Section>

      <Section title="7. Kontak Kami">
        Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, silakan
        hubungi kami melalui halaman{" "}
        <LinkText href="/contact">Contact</LinkText>.
      </Section>

      <p className="mt-8 text-sm text-gray-500">
        Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
      </p>
    </div>
  );
}
