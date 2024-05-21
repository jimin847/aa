import "./App.css";
import { useState } from 'react';
import NavBar from './Component/NavBar'; // 대소문자에 맞게 수정
import Stage from './Component/Stage'; // 대소문자에 맞게 수정
import Game from './Component/Game'; // 대소문자에 맞게 수정

function App() {
    const [stageOnoff, setStage] = useState(1);
    const [id, setId] = useState(0);  // 여기서 setId를 정의합니다.
    const [type, setType] = useState(0); // 0 : 10x10, 1 : 15x15

    return (
        <div className="background">
            <NavBar stageOnoff={stageOnoff} setStage={setStage}></NavBar>
            <div className="container">
                {stageOnoff ?
                    <Stage stageOnoff={stageOnoff} setStage={setStage} setid={setId} id={id} setType={setType} type={type}></Stage> :
                    <Game id={id} type={type}></Game>
                }
            </div>
        </div>
    );
}

export default App;
