import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BoardDetailPage = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoardDetail = async () => {
            try {
                const response = await fetch(`http://localhost:3000/boards/${id}`);
                const data = await response.json();
                setBoard(data);
            } catch (err) {
                console.error('Error fetching board detail:', err);
            }
        };
        fetchBoardDetail();
    }, [id]);

    // CLOB 데이터를 파싱하여 배열로 변환
    let keywords = [];
    if (board && typeof board.keyword === 'string') {
        try {
            keywords = JSON.parse(board.keyword); // JSON 문자열을 배열로 파싱
        } catch (err) {
            console.error('Error parsing keywords:', err);
        }
    }

    // 삭제 버튼 클릭 핸들러
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/boards/${id}`, {
                method: 'DELETE',
                credentials: 'include', // 쿠키를 포함하여 전송
            });

            if (response.ok) {
                alert('게시글이 삭제되었습니다.');
                navigate('/'); // 삭제 후 메인 페이지로 이동
            } else {
                alert('게시글 삭제에 실패했습니다.');
            }
        } catch (err) {
            console.error('Error deleting board:', err);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    if (!board) return <div>Loading...</div>;

    return (
        <div>
            <h2>제목: {board.title}</h2>
            <p>작성일자: {board.created_at}</p>
            <p>내용: {board.content}</p>
            <p>
                키워드: {Array.isArray(keywords)
                    ? keywords.map((word) => `#${word}`).join(' ')
                    : ''}
            </p>
            <button onClick={handleDelete}>삭제</button> {/* 삭제 버튼 추가 */}
        </div>
    );
};

export default BoardDetailPage;
