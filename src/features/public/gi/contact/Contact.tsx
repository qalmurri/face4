export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="mb-6">
        Jika Anda memiliki pertanyaan, saran, atau membutuhkan bantuan, silakan
        hubungi kami melalui formulir di bawah ini atau gunakan informasi kontak
        yang tersedia.
      </p>

      {/* Contact Form */}
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama</label>
          <input
            type="text"
            placeholder="Masukkan nama Anda"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Masukkan email Anda"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Pesan</label>
          <textarea
            placeholder="Tulis pesan Anda..."
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Kirim
        </button>
      </form>

      {/* Contact Info */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Informasi Kontak</h2>
        <p className="mb-2">📍 Alamat: Jl. Contoh No.123, Jakarta, Indonesia</p>
        <p className="mb-2">📧 Email: support@example.com</p>
        <p className="mb-2">📞 Telepon: +62 000-0000-0000</p>
      </div>
    </div>
  );
}
