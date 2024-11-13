// Import 구역
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import UserContext
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BoardPage from './pages/BoardPage';
import CreateBoardPage from './pages/CreateBoardPage';
import BoardDetailPage from './pages/BoardDetailPage';
import Dashboard from './pages/Dashboard';
import { jwtDecode } from 'jwt-decode';
import './App.css'; 

// App 컴포넌트 구역
const App = () => {
  // 상태 관리 구역
  const [userEmail, setUserEmail] = useState('guest');

  // useEffect 구역: 쿠키에서 토큰 읽기 및 로그인 상태 설정
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        // 토큰이 만료되지 않았으면 이메일 상태 업데이트
        if (decodedToken.exp > currentTime) {
          setUserEmail(decodedToken.email);
        } else {
          setUserEmail('guest');
        }
      } catch (error) {
        console.error('토큰 디코딩 오류:', error);
        setUserEmail('guest');
      }
    }
  }, []);

  // 렌더링 구역
  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      <Router>
        <div className="app">
          <Header />
          <div className="main-content">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/board" element={<BoardPage />} />
                <Route path="/boards/:id" element={<BoardDetailPage />} />
                <Route path="/create-board" element={<CreateBoardPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
};

// Export 구역
export default App;
