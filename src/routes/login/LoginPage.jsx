import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, getUserInfo } from '../../libs/apis/login';
import { setUser } from '../../store/reducers/user';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
          sessionStorage.setItem('token', token); 
          const userInfo = await getUserInfo(token);
          dispatch(setUser(userInfo.response)); 
          navigate('/home');
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
          <img src="https://via.placeholder.com/100" alt="Logo" className="w-24 h-24" /> {/* 로고 나오면 수정예정. placeholder임 */}
        </div>
        <div className="space-y-8">
          <input
            type="text"
            placeholder="이메일"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 text-black placeholder-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#94caff] placeholder-black focus:placeholder-[#94caff]"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-black placeholder-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#94caff] placeholder-black focus:placeholder-[#94caff]"
          />
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <div className="mt-20 space-y-8">
          <button
            className="w-full px-4 py-2 font-bold text-black bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#94caff]"
            onClick={handleLogin}
          >
            로그인
          </button>
          <button
            className="w-full px-4 py-2 font-bold text-black bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#94caff]"
            onClick={handleSignUp}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
