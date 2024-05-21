
import "./Puzzle.css";

function Puzzle({num, setStage, stageOnoff, setid, id}) {
    return (
        <div className='puzzle' onClick={()=>{
            // console.log(num);
            setid(num);
            setStage(0)
            }}>
            {num}
        </div>

    )
}
export default Puzzle;