//Lebih ke inline link dalam teks.
//Styling biasanya ringan: underline, hover warna biru, tidak seperti tombol.
//Contoh: "Baca lebih lanjut", atau link di dalam paragraf.

type LinkTextProps = {
  href: string;
  children: React.ReactNode;
};

export function LinkText({ href, children }: LinkTextProps) {
  return (
    <a href={href} className="text-blue-600 underline">
      {children}
    </a>
  );
}
