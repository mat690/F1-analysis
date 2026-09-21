function getCompoundClass(compound) {
    if (!compound) return "";

    return compound.toLowerCase();
}

function RaceStints({
    driver1,
    driver2,
    data1,
    data2
}) {
    const drivers = [
        {
            code: driver1,
            stints: data1?.stints ?? []
        },
        {
            code: driver2,
            stints: data2?.stints ?? []
        }
    ];

    const maxLap = Math.max(
        1,
        ...drivers.flatMap(driver =>
            driver.stints.map(
                stint => stint.tourFin ?? 0
            )
        )
    );

    return (
        <div className="card race-stints">

            <div className="section-header">

                <div>
                    <span className="section-badge">
                        STRATÉGIE
                    </span>

                    <h2>
                        🛞 Pneus et stints
                    </h2>

                    <p>
                        Comparaison des relais effectués
                        pendant la course
                    </p>
                </div>

            </div>

            <div className="race-stint-list">

                {drivers.map(driver => (

                    <div
                        className="race-stint-driver"
                        key={driver.code}
                    >

                        <div className="race-stint-driver-name">
                            {driver.code}
                        </div>

                        <div className="race-stint-timeline">

                            {driver.stints.map(stint => {

                                const start =
                                    stint.tourDebut ?? 1;

                                const end =
                                    stint.tourFin ?? start;

                                const left =
                                    ((start - 1) / maxLap) * 100;

                                const width =
                                    ((end - start + 1) / maxLap) * 100;

                                return (

                                    <div
                                        key={stint.stint}
                                        className={
                                            `race-stint-bar ${
                                                getCompoundClass(
                                                    stint.compound
                                                )
                                            }`
                                        }
                                        style={{
                                            left: `${left}%`,
                                            width: `${width}%`
                                        }}
                                        title={
                                            `${stint.compound ?? "Pneu"} — ` +
                                            `Tours ${start} à ${end}`
                                        }
                                    >

                                        <strong>
                                            {stint.compound ?? "—"}
                                        </strong>

                                        <span>
                                            T{start} → T{end}
                                        </span>

                                    </div>

                                );

                            })}

                        </div>

                    </div>

                ))}

            </div>

            <div className="race-stint-scale">
                <span>Tour 1</span>
                <span>Tour {maxLap}</span>
            </div>

        </div>
    );
}

export default RaceStints;