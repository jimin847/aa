import React, { useEffect, useState } from 'react';

function Leaderboard({ puzzleId }) {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/game/leaderboard/${puzzleId}`)
            .then(response => response.json())
            .then(data => setRecords(data))
            .catch(error => console.error('Error fetching leaderboard:', error));
    }, [puzzleId]);

    return (
        <div className="leaderboard-container">
            <h3>순위표</h3>
            <ul>
                {records.map(record => (
                    <li key={record.id}>
                        <span>{record.username}</span> - <span>{record.timeTaken} ms</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;
