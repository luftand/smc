import React, { useState } from 'react';

const CreateBoardPage = () => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [content, setContent] = useState('');
    const [keyword, setKeyword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 키워드를 JSON 문자열로 변환 (필요에 따라 사용)
        const keywordForClob = JSON.stringify(keyword.split(',').map(kw => kw.trim()));

        // 전송되는 데이터 출력 (디버깅용)
        alert(`제목: ${title}\n링크: ${link}\n내용: ${content}\n키워드: ${keywordForClob}`);

        try {
            const response = await fetch('http://localhost:3000/boards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    link,
                    content,
                    keyword: keywordForClob, // CLOB에 저장될 키워드
                }),
                credentials: 'include' // 쿠키를 자동으로 포함
            });

            if (response.ok) {
                alert('게시글이 성공적으로 작성되었습니다.');
                window.location.href = '/board'; // 게시글 목록 페이지로 이동
            } else if (response.status === 401 || response.status === 403) {
                alert('권한이 없습니다. 다시 로그인해 주세요.');
            } else {
                alert('게시글 작성에 실패했습니다.');
            }
        } catch (err) {
            console.error('Error creating board:', err);
            alert('게시글 작성 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h2>글쓰기</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>링크:</label>
                    <input type="text" value={link} onChange={(e) => setLink(e.target.value)} required />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </div>
                <div>
                    <label>키워드 (쉼표로 구분):</label>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">작성하기</button>
            </form>
        </div>
    );
};

export default CreateBoardPage;
