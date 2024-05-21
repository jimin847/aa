import "./Puzzle.css";

function Puzzle({ num, setStage, stageOnoff, setid, id }) {
    return (
        <div className='puzzle' onClick={() => {
            setid(num); // num을 전달하여 id를 설정합니다.
            setStage(0); // 스테이지를 설정합니다.
        }}>
            {num}
        </div>
    );
}

export default Puzzle;
