export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        Selamat datang di website kami. Dengan mengakses atau menggunakan
        layanan ini, Anda dianggap setuju untuk terikat dengan syarat dan
        ketentuan berikut. Jika Anda tidak menyetujui, harap jangan gunakan
        layanan kami.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        1. Penggunaan Layanan
      </h2>
      <p className="mb-4">
        Anda setuju untuk menggunakan layanan hanya untuk tujuan yang sah sesuai
        hukum dan tidak melanggar hak pihak ketiga. Aktivitas yang merugikan,
        menipu, atau merusak sistem tidak diperbolehkan.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2. Akun Pengguna</h2>
      <p className="mb-4">
        Jika Anda membuat akun, Anda bertanggung jawab untuk menjaga kerahasiaan
        informasi login dan semua aktivitas yang terjadi di akun Anda. Segera
        beri tahu kami jika ada akses tidak sah atau pelanggaran keamanan.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3. Konten</h2>
      <p className="mb-4">
        Semua konten yang tersedia di layanan ini adalah milik kami atau mitra
        kami dan dilindungi oleh hak cipta. Anda tidak diperbolehkan menyalin,
        mendistribusikan, atau memodifikasi konten tanpa izin tertulis.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        4. Pembatasan Tanggung Jawab
      </h2>
      <p className="mb-4">
        Kami tidak bertanggung jawab atas kerugian langsung maupun tidak
        langsung yang timbul dari penggunaan layanan ini. Layanan disediakan
        "sebagaimana adanya" tanpa jaminan apa pun.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">5. Perubahan Syarat</h2>
      <p className="mb-4">
        Kami berhak untuk memperbarui atau mengubah syarat ini kapan saja.
        Perubahan akan berlaku segera setelah dipublikasikan di halaman ini.
        Anda disarankan untuk meninjau syarat ini secara berkala.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        6. Hukum yang Berlaku
      </h2>
      <p className="mb-4">
        Syarat dan ketentuan ini diatur oleh hukum yang berlaku di Indonesia.
        Segala sengketa akan diselesaikan melalui jalur hukum sesuai peraturan
        yang berlaku.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">7. Kontak Kami</h2>
      <p className="mb-4">
        Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, silakan
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
