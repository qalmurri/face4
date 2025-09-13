import { useState } from "react";
import NewsCard from "./components/NewsCard";

const dummyNews = [
    {
        title: "Peluncuran Satelit Baru Indonesia",
        description: "Satelit komunikasi terbaru telah diluncurkan untuk meningkatkan jaringan internet nasional.",
        image: "https://via.placeholder.com/800x400.png?text=Satelit+Indonesia"
    },
    {
        title: "Festival Kuliner Nusantara",
        description: "Ribuan pengunjung menikmati berbagai makanan khas dari seluruh penjuru Indonesia.",
        image: "https://via.placeholder.com/800x400.png?text=Festival+Kuliner"
    },
    {
        title: "Timnas U-23 Lolos ke Final",
        description: "Tim nasional sepak bola U-23 berhasil masuk final setelah mengalahkan lawan berat.",
        image: "https://via.placeholder.com/800x400.png?text=Timnas+U-23"
    },
    {
        title: "Peluncuran Satelit Baru Indonesia",
        description: "Satelit komunikasi terbaru telah diluncurkan untuk meningkatkan jaringan internet nasional.",
        image: "https://via.placeholder.com/800x400.png?text=Satelit+Indonesia"
    },
    {
        title: "Festival Kuliner Nusantara",
        description: "Ribuan pengunjung menikmati berbagai makanan khas dari seluruh penjuru Indonesia.",
        image: "https://via.placeholder.com/800x400.png?text=Festival+Kuliner"
    },
    {
        title: "Timnas U-23 Lolos ke Final",
        description: "Tim nasional sepak bola U-23 berhasil masuk final setelah mengalahkan lawan berat.",
        image: "https://via.placeholder.com/800x400.png?text=Timnas+U-23"
    }
];

export default function Landing() {
    const [news] = useState(dummyNews);

    return (
        <div >
            <h1>Berita Terbaru</h1>
            {news.map((item, index) => (
                <NewsCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                />
            ))}
        </div>
    );
}