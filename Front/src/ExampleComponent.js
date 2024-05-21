import React, { useState, useEffect } from 'react';

const ExampleComponent = () => {
    const [solution, setSolution] = useState([]);
    const [puzzleId, setPuzzleId] = useState(1);
    const [is10x10, setIs10x10] = useState(true);
    const [answer, setAnswer] = useState(null);

    const submitSolution = () => {
        fetch(`http://localhost:8080/api/puzzles/answers/${puzzleId}?is10x10=${is10x10}`)
            .then(response => response.json())
            .then(data => {
                setAnswer(data);
                console.log('Puzzle answer:', data);
            })
            .catch(error => console.error('Error fetching puzzle answer:', error));
    };

    return (
        <div>
            <h1>Puzzle Submission</h1>
            <div>
                <label>
                    Puzzle ID:
                    <input type="number" value={puzzleId} onChange={(e) => setPuzzleId(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Is 10x10:
                    <input type="checkbox" checked={is10x10} onChange={(e) => setIs10x10(e.target.checked)} />
                </label>
            </div>
            <button onClick={submitSolution}>Submit Solution</button>
            {answer && (
                <div>
                    <h2>Answer:</h2>
                    <pre>{JSON.stringify(answer, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ExampleComponent;
