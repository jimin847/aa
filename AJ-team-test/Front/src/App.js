import "./App.css";
import { useState } from 'react';
import NavBar from './Conponent/NavBar';
import Stage from './Conponent/Stage';
import Game from './Conponent/Game';

function App() {
  
  const [stageOnoff, setStage] = useState(1);
  const [id, setid] = useState(0);
  const [type, setType] = useState(0); // 0 : 10x10, 1 : 15x15
  return (
    <div className="background">
      <NavBar stageOnoff={stageOnoff} setStage={setStage}></NavBar>
      <div className="container">
        {
          stageOnoff ? 
          <Stage stageOnoff={stageOnoff} setStage={setStage} setid={setid} id={id} setType={setType} type={type}></Stage>
          : <Game id={id} type={type}></Game>
        }
      </div>
    </div>
    
  )
}

export default App;
