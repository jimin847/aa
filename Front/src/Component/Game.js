import { useState, useEffect } from 'react';
import "./Game.css";
import Board from './Board';
import Howto from './Howto';
import Rank from './Rank';

function Game({ id, type }) {
    const [nono10, setnono10] = useState([...Array(10)].map(() => Array(10).fill(0)));
    const [nono15, setnono15] = useState([...Array(15)].map(() => Array(15).fill(0)));
    const [hour, setHour] = useState(new Date().getHours());
    const [minute, setMinute] = useState(new Date().getMinutes());
    const [second, setSecond] = useState(new Date().getSeconds());
    const [pasthour, setpasthour] = useState(0);
    const [pastmin, setpastmin] = useState(0);
    const [pastsec, setpastsec] = useState(0);

    useEffect(() => {
        setpasthour(new Date().getHours());
        setpastmin(new Date().getMinutes());
        setpastsec(new Date().getSeconds());
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setHour(new Date().getHours() - pasthour);
            setMinute(new Date().getMinutes() - pastmin);
            setSecond(new Date().getSeconds() - pastsec);
        }, 1000);
        return () => clearInterval(id);
    }, [pasthour, pastmin, pastsec]);

    return (
        <div className='GameBoard'>
            <div className='ToolBox'>
                <div className='StageName' onClick={() => { type ? console.log(nono15) : console.log(nono10) }}>
                    Stage {id}
                </div>
                <div className='ToolBar'>
                    <div className='toolGroup1'>
                        <button>H</button>
                        <button>↺</button>
                    </div>
                    <div className='Clock'>
                        {hour < 10 ? '0' + hour : hour}:{minute < 10 ? '0' + minute : minute}:{second < 10 ? '0' + second : second}
                    </div>
                    <div className='toolGroup2'>
                        <button>◀</button>
                        <button>▶</button>
                    </div>
                </div>
                <div className='StageName'>{type ? "15x15" : "10x10"}</div>
            </div>
            <div className='boardBox'>
                <div className='nothing'></div>
                <div className='middlebox'>
                    <Board type={type} nono10={nono10} setnono10={setnono10} nono15={nono15} setnono15={setnono15} puzzleId={id}></Board>
                    <button className='summit'>SUBMIT</button>
                </div>
                <div className='help'>
                    <Howto />
                    <Rank />
                </div>
            </div>
        </div>
    )
}

export default Game;
