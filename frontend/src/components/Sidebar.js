import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import './Sidebar.css';

const Sidebar = () => {
  const { userEmail, setUserEmail } = useContext(UserContext);

  const handleLogout = () => {
    // 쿠키 삭제
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUserEmail('guest'); // 로그아웃 시 이메일을 "guest"로 설정
    alert('로그아웃 되었습니다.');
  };

  // 접속 계정 설정: 로그인하지 않은 경우 "guest"로 표시
  const username = userEmail === 'guest' ? 'guest' : userEmail;

  return (
    <div className="sidebar">
      <h3>메뉴</h3>
      <p>접속계정: {username}</p> {/* 접속 계정 표시 */}
      {userEmail !== 'guest' && (
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      )}
      <ul>
        <li><a href="/dashboard">대시보드</a></li>
        <li><a href="/board">게시판</a></li>
        <li><a href="/login">로그인</a></li>
        <li><a href="/signup">회원가입</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
