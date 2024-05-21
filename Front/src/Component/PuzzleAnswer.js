import React, { useState, useEffect } from 'react';

const PuzzleAnswer = ({ puzzleId }) => {
    const [answer, setAnswer] = useState(null);

    useEffect(() => {
        const fetchAnswer = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/answer/${puzzleId}`);
                const data = await response.json();
                setAnswer(data);
            } catch (error) {
                console.error('Error fetching the answer:', error);
            }
        };

        fetchAnswer();
    }, [puzzleId]);

    return (
        <div>
            <h2>Puzzle Answer</h2>
            {answer ? (
                <pre>{JSON.stringify(answer, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PuzzleAnswer;
