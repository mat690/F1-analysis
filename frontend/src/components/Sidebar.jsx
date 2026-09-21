function Sidebar({
    activePage,
    setActivePage
}) {

    const items = [
        {
            id: "telemetry",
            label: "Télémétrie",
            icon: "📈"
        },
        {
            id: "practice",
            label: "Essais libres",
            icon: "🧪"
        },
        {
            id: "qualifying",
            label: "Qualifications",
            icon: "⏱️"
        },
        {
            id: "sprintQualifying",
            label: "Qualifs Sprint",
            icon: "⚡"
        },
        {
            id: "sprint",
            label: "Sprint",
            icon: "🏁"
        },
        {
            id: "race",
            label: "Course",
            icon: "🏆"
        },
        {
            id: "testing",
            label: "Essais hivernaux",
            icon: "❄️"
        }
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                🏎️ F1 Analysis
            </div>

            <nav className="sidebar-nav">

                {items.map(item => (

                    <button
                        key={item.id}
                        className={
                            activePage === item.id
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                        onClick={() =>
                            setActivePage(item.id)
                        }
                    >
                        <span>
                            {item.icon}
                        </span>

                        {item.label}
                    </button>

                ))}

            </nav>

        </aside>
    );
}

export default Sidebar;