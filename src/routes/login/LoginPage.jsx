import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, getUserInfo } from '../../libs/apis/login';
import { setUser } from '../../store/reducers/user';
import emailicon from '../../assets/emailicon.png';
import passwordicon from '../../assets/passwordicon.png';

import solLogo from '../../assets/solLogo.png';

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
          setError('잠시 후에 다시 시도해주세요.');
        }
      }
    } catch (err) {
      setError(err.message || '잠시 후에 다시 시도해주세요.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="absolute top-8 left-4 text-black" onClick={() => navigate('/home')}>
        <img src="/src/assets/cheveron-left.svg" alt="Logo" className="w-8 h-8" />
      </div>
      <div className="w-11/12 max-w-sm p-4">
        <div className="flex justify-center mb-16">
          <img src={solLogo} alt="Logo" className="w-36 h-36" />
        </div>
        <div className="space-y-8">
          <div className="flex items-center border rounded-xl shadow-md">
            <img src={emailicon} alt="Email Icon" className="w-6 h-6 ml-3" />
            <input
              type="text"
              placeholder="이메일"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 text-black border-none focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex items-center border rounded-xl shadow-md">
            <img src={passwordicon} alt="Password Icon" className="w-6 h-6 ml-3" />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-black border-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <div className="mt-16 space-y-8 flex flex-col items-center">
          <button
            className="w-2/3 px-4 py-2 text-white bg-[#0046FF] rounded-full shadow-md focus:outline-none"
            onClick={handleLogin}
          >
            로그인
          </button>
          <button
            className="w-2/3 px-4 py-2 text-black bg-[#ECECEC] rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#94caff]"
            onClick={handleSignUp}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
