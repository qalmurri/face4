// Definisikan tipe props
interface NewsCardProps {
    title: string;
    description: string;
    image?: string; // pakai ? supaya optional
}

export default function NewsCard({ title, description, image }: NewsCardProps) {
    return (
        <div>
            {image && <img src={image} alt={title} />}
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}