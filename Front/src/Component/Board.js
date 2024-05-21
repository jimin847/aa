import { useState, useEffect } from 'react';
import './Board.css';

function Board({ type, nono10, setnono10, nono15, setnono15, puzzleId }) {
    // 사용자 이름을 저장하는 상태
    const [username, setUsername] = useState('');
    // 경과 시간을 저장하는 상태
    const [timeTaken, setTimeTaken] = useState(0);
    // 시작 시간을 저장하는 상태
    const [startTime] = useState(Date.now());
    // 리더보드를 저장하는 상태
    const [leaderboard, setLeaderboard] = useState([]);
    // 팝업 표시 여부를 저장하는 상태
    const [showPopup, setShowPopup] = useState(false);

    // 매 초마다 경과 시간을 업데이트하는 효과
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeTaken(Date.now() - startTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    // 제출 버튼 클릭 시 호출되는 함수
    const handleSubmit = async () => {
        const solution = type ? nono15 : nono10;
        // 정답을 서버에 제출하고 결과를 확인
        const response = await fetch('http://localhost:8080/api/game/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                puzzleId: puzzleId,
                is10x10: !type,
                solution: solution,
                timeTaken: timeTaken
            })
        });

        if (response.ok) {
            const isCorrect = await response.json();
            // 정답인 경우 팝업을 표시
            if (isCorrect) {
                setShowPopup(true);
            } else {
                // 오답인 경우 알림 표시
                alert('오답입니다.');
            }
        } else {
            alert('에러가 발생했습니다. 다시 시도해주세요.');
        }
    };

    // 팝업에서 제출 버튼 클릭 시 호출되는 함수
    const handlePopupSubmit = async () => {
        setShowPopup(false);
        const response = await fetch('http://localhost:8080/api/game/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                puzzleId: puzzleId,
                username: username,
                timeTaken: timeTaken
            })
        });

        if (response.ok) {
            alert('기록이 저장되었습니다.');
            fetchLeaderboard();
        } else {
            alert('에러가 발생했습니다. 다시 시도해주세요.');
        }
    };

    // 리더보드를 서버에서 가져오는 함수
    const fetchLeaderboard = async () => {
        const response = await fetch(`http://localhost:8080/api/game/leaderboard?puzzleId=${puzzleId}`);
        const data = await response.json();
        setLeaderboard(data);
    };

    return (
        <div className='nonogram'>
            <div className='nonobox'>
                {type ?
                    nono15.map((a, i) => (
                        <div className='row' key={i}>
                            {nono15[i].map((b, j) => (
                                <button key={j} className={b ? 'full' : 'empty'} onClick={() => {
                                    let copy = [...nono15];
                                    copy[i][j] = copy[i][j] ? 0 : 1;
                                    setnono15(copy);
                                }}></button>
                            ))}
                        </div>
                    )) :
                    nono10.map((a, i) => (
                        <div className='row' key={i}>
                            {nono10[i].map((b, j) => (
                                <button key={j} className={b ? 'full' : 'empty'} onClick={() => {
                                    let copy = [...nono10];
                                    copy[i][j] = copy[i][j] ? 0 : 1;
                                    setnono10(copy);
                                }}></button>
                            ))}
                        </div>
                    ))
                }
            </div>
            <button className='summit' onClick={handleSubmit}>SUBMIT</button>

            <div>
                <h3>순위표</h3>
                <ul>
                    {leaderboard.map(record => (
                        <li key={record.id}>
                            {record.username} - {formatTime(record.timeTaken)}
                        </li>
                    ))}
                </ul>
            </div>

            {showPopup && (
                <div className='popup'>
                    <div className='popup-inner'>
                        <h3>정답입니다! 이름을 입력하세요</h3>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button onClick={handlePopupSubmit}>제출</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// 밀리초 단위의 시간을 mm:ss 형식으로 변환하는 함수
const formatTime = (timeInMillis) => {
    const totalSeconds = Math.floor(timeInMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default Board;
