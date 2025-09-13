import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <h1>404</h1>
            <p>Oops! Halaman yang kamu cari tidak ditemukan.</p>
            <Link to="/">Kembali ke Home</Link>
        </>
    );
}