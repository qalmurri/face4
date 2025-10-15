import {Heading, LinkText} from "../../../../../Components/Atoms";
import Text from "../../../../../Components/Atoms/Typography/Text";
import Section from "../../../../../Components/Molecules/Sections/Section";

export default function PrivacyPolicyContent() {
    return (
        <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
            <Heading level={1}>Privacy Policy</Heading>

            <Text>
                Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
                menggunakan, dan melindungi informasi pribadi Anda ketika menggunakan
                layanan kami. Dengan mengakses layanan ini, Anda menyetujui praktik yang
                dijelaskan dalam kebijakan ini.
            </Text>

            <Section title="1. Informasi yang Kami Kumpulkan">
                <Text>
                    Kami dapat mengumpulkan informasi pribadi seperti nama, alamat email,
                    nomor telepon, serta data penggunaan saat Anda menggunakan layanan
                    kami atau mendaftar akun.
                </Text>
            </Section>

            <Section title="2. Penggunaan Informasi">
                <Text>Informasi yang kami kumpulkan digunakan untuk:</Text>
                <ul className="list-disc pl-6 mb-4">
                    <li>Menyediakan dan meningkatkan layanan kami</li>
                    <li>Menghubungi Anda terkait pembaruan atau informasi penting</li>
                    <li>Memproses transaksi dan kebutuhan administrasi</li>
                    <li>Melindungi dari penyalahgunaan dan aktivitas ilegal</li>
                </ul>
            </Section>

            <Section title="3. Perlindungan Data">
                <Text>
                    Kami berkomitmen untuk melindungi informasi pribadi Anda. Kami
                    menggunakan langkah keamanan teknis dan administratif untuk mencegah
                    akses yang tidak sah, kehilangan, atau kebocoran data.
                </Text>
            </Section>

            <Section title="4. Berbagi Informasi">
                <Text>
                    Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak
                    ketiga. Namun, informasi dapat dibagikan dengan pihak terpercaya yang
                    membantu operasional kami atau jika diwajibkan oleh hukum.
                </Text>
            </Section>

            <Section title="5. Cookies dan Teknologi Serupa">
                <Text>
                    Kami dapat menggunakan cookies untuk meningkatkan pengalaman pengguna,
                    menganalisis lalu lintas, dan menyesuaikan konten. Anda dapat mengatur
                    browser untuk menolak cookies, namun beberapa fitur mungkin tidak
                    berfungsi optimal.
                </Text>
            </Section>

            <Section title="6. Hak Anda">
                <Text>
                    Anda berhak untuk mengakses, memperbarui, atau menghapus informasi
                    pribadi Anda. Silakan hubungi kami jika ingin menggunakan hak
                    tersebut.
                </Text>
            </Section>

            <Section title="7. Perubahan Kebijakan">
                <Text>
                    Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
                    Setiap perubahan akan dipublikasikan di halaman ini dengan tanggal
                    pembaruan terbaru.
                </Text>
            </Section>

            <Section title="8. Kontak Kami">
                <Text>
                    Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan
                    hubungi kami melalui halaman <LinkText href="/contact">Contact</LinkText>.
                </Text>
            </Section>

            <p className="mt-8 text-sm text-gray-500">
                Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
            </p>
        </div>
    );
}