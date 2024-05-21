import { useEffect, useState } from 'react';
import './Board.css';

function Board({ type, nono10, setnono10, nono15, setnono15, puzzleId }) {
    const [tap, setTap] = useState(false);

    useEffect(() => {}, [nono15]);

    const handleSubmit = async () => {
        const solution = type ? nono15 : nono10;
        try {
            const response = await fetch(`http://localhost:8080/api/check-answer?puzzleId=${puzzleId}&is10x10=${!type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(solution),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('API response:', result);
            if (result) {
                alert("Correct!");
            } else {
                alert("Incorrect, try again.");
            }
        } catch (error) {
            console.error('Error during API call:', error);
        }
    };

    return (
        <div className='nonogram'>
            <div className='nonobox'>
                {type ?
                    nono15.map((a, i) => (
                        <div className='row' key={i}>
                            {nono15[i].map((b, j) => (
                                <button className={b ? 'full' : 'empty'} onClick={() => {
                                    let copy = [...nono15];
                                    copy[i][j] = copy[i][j] ? 0 : 1;
                                    setnono15(copy);
                                }} key={j}></button>
                            ))}
                        </div>
                    )) :
                    nono10.map((a, i) => (
                        <div className='row' key={i}>
                            {nono10[i].map((b, j) => (
                                <button className={nono10[i][j] ? 'full' : 'empty'} onClick={() => {
                                    let copy = [...nono10];
                                    copy[i][j] = copy[i][j] ? 0 : 1;
                                    setnono10(copy);
                                }} key={j}></button>
                            ))}
                        </div>
                    ))
                }
            </div>
            <button onClick={handleSubmit} className='summit'>SUBMIT</button>
        </div>
    )
}

export default Board;
