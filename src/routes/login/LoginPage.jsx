import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../libs/apis/login';

export default function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginUser(userId, password);
      if (data.success) {
        if (data.response === 'password error') {
          setError('비밀번호가 틀렸습니다.');
        } else {
          const token = data.response;
          localStorage.setItem('jwtToken', token); // 추후 redux에 저장하도록 할 예정. redux를 다른 페이지들에서 어떻게 받아서 쓸지 몰라서, 일단 로컬스토리지로 저장하는 방식으로 해뒀음
          navigate('/'); 
        }
      } else {
        if (data.response === '회원가입이 필요합니다') {
          setError('아이디가 존재하지 않습니다.');
        } else {
          setError('로그인 중 오류가 발생했습니다.');
        }
      }
    } catch (err) {
      setError(err.message || '로그인 중 오류가 발생했습니다.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
      <div className="w-11/12 max-w-sm p-4">
        <div className="flex justify-center mb-16">
          <img src="https://via.placeholder.com/100" alt="Logo" className="w-24 h-24" /> {/* 로고 나오면 수정예정. placeholder임*/}
        </div>
        <div className="space-y-8">
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 text-black placeholder-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-black placeholder-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
          />
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <div className="mt-20 space-y-8">
          <button
            className="w-full px-4 py-2 font-bold text-black bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleLogin}
          >
            로그인
          </button>
          <button
            className="w-full px-4 py-2 font-bold text-black bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSignUp}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
