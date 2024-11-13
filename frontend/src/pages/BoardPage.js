import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BoardPage = () => {
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await fetch('http://localhost:3000/boards');
                const data = await response.json();
                setBoards(data);
            } catch (err) {
                console.error('Error fetching boards:', err);
            }
        };
        fetchBoards();
    }, []);

    // 글쓰기 버튼 클릭 핸들러
    const handleCreateBoard = () => {
        navigate('/create-board'); // 글쓰기 페이지로 이동
    };

    // 게시글 클릭 핸들러
    const handleBoardClick = (id) => {
        navigate(`/boards/${id}`); // 게시글 상세 페이지로 이동
    };

    return (
        <div>
            <h2>Board</h2>
            <button onClick={handleCreateBoard}>글쓰기</button> {/* 글쓰기 버튼 추가 */}
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board) => (
                        <tr
                            key={board.id}
                            onClick={() => handleBoardClick(board.id)}
                            style={{ cursor: 'pointer' }} // 커서 모양을 변경
                        >
                            <td>{board.id}</td>
                            <td>{board.title}</td>
                            <td>{board.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BoardPage;
