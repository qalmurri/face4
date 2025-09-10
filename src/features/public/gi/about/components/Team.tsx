export default function Team() {
    const team = [
        { name: "Andi", role: "CEO", img: "https://via.placeholder.com/150" },
        { name: "Budi", role: "Editor", img: "https://via.placeholder.com/150" },
        { name: "Citra", role: "Reporter", img: "https://via.placeholder.com/150" },
    ];

    return (
        <section style={{ padding: "2rem 1rem" }}>
            <h2>Tim Kami</h2>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {team.map((member, index) => (
                    <div
                        key={index}
                        style={{ textAlign: "center", width: "150px" }}
                    >
                        <img
                            src={member.img}
                            alt={member.name}
                            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                        />
                        <h4>{member.name}</h4>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}