interface StatsCardProps {
  title: string;
  value: string | number;
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}