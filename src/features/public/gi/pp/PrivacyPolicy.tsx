export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
        menggunakan, dan melindungi informasi pribadi Anda ketika menggunakan
        layanan kami. Dengan mengakses layanan ini, Anda menyetujui praktik yang
        dijelaskan dalam kebijakan ini.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        1. Informasi yang Kami Kumpulkan
      </h2>
      <p className="mb-4">
        Kami dapat mengumpulkan informasi pribadi seperti nama, alamat email,
        nomor telepon, serta data penggunaan saat Anda menggunakan layanan kami
        atau mendaftar akun.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        2. Penggunaan Informasi
      </h2>
      <p className="mb-4">Informasi yang kami kumpulkan digunakan untuk:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Menyediakan dan meningkatkan layanan kami</li>
        <li>Menghubungi Anda terkait pembaruan atau informasi penting</li>
        <li>Memproses transaksi dan kebutuhan administrasi</li>
        <li>Melindungi dari penyalahgunaan dan aktivitas ilegal</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3. Perlindungan Data</h2>
      <p className="mb-4">
        Kami berkomitmen untuk melindungi informasi pribadi Anda. Kami
        menggunakan langkah keamanan teknis dan administratif untuk mencegah
        akses yang tidak sah, kehilangan, atau kebocoran data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">4. Berbagi Informasi</h2>
      <p className="mb-4">
        Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak
        ketiga. Namun, informasi dapat dibagikan dengan pihak terpercaya yang
        membantu operasional kami atau jika diwajibkan oleh hukum.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        5. Cookies dan Teknologi Serupa
      </h2>
      <p className="mb-4">
        Kami dapat menggunakan cookies untuk meningkatkan pengalaman pengguna,
        menganalisis lalu lintas, dan menyesuaikan konten. Anda dapat mengatur
        browser untuk menolak cookies, namun beberapa fitur mungkin tidak
        berfungsi optimal.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">6. Hak Anda</h2>
      <p className="mb-4">
        Anda berhak untuk mengakses, memperbarui, atau menghapus informasi
        pribadi Anda. Silakan hubungi kami jika ingin menggunakan hak tersebut.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        7. Perubahan Kebijakan
      </h2>
      <p className="mb-4">
        Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Setiap
        perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan
        terbaru.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">8. Kontak Kami</h2>
      <p className="mb-4">
        Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan
        hubungi kami melalui halaman{" "}
        <a href="/contact" className="text-blue-600 underline">
          Contact
        </a>
        .
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
      </p>
    </div>
  );
}
