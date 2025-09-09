import StatsCard from "./components/StatsCard";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <StatsCard title="Users" value={100} />
    </div>
  );
}
