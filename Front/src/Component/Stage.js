import { useState } from 'react';
import "./Stage.css";
import Puzzle from "./Puzzle";

function Stage({ stageOnoff, setStage, setid, id, setType, type }) {
    const [Numbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    return (
        <div className='stagebox'>
            <div className='StagePick'>Pick Stage</div>
            <div className='wrapper'>
                <div className='PuzzleBox'>
                    <div className='PuzzleType'>10x10</div>
                    <div className='puzzles' onClick={() => { setType(0); }}>
                        {Numbers.map(a => (
                            <Puzzle key={`10x10-${a}`} num={a} setStage={setStage} stageOnoff={stageOnoff} setid={setid} id={id} />
                        ))}
                    </div>
                </div>
                <div className='PuzzleBox'>
                    <div className='PuzzleType'>15x15</div>
                    <div className='puzzles' onClick={() => { setType(1); }}>
                        {Numbers.map(a => (
                            <Puzzle key={`15x15-${a}`} num={a} setStage={setStage} stageOnoff={stageOnoff} setid={setid} id={id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stage;
