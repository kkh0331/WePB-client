import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser, checkEmailAvailability } from '../../libs/apis/signin';

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [signupError, setSignupError] = useState('');

  const photo = "https://upload.wikimedia.org/wikipedia/commons/5/5a/SOL%EC%BA%90%EB%A6%AD%ED%84%B0.png";

  const handleNameBlur = () => {
    if (name.length < 2) {
      setNameMessage('이름을 2글자 이상 입력해주세요.');
    } else {
      setNameMessage('이름이 정상적으로 입력되었습니다.');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length >= 2) {
      setNameMessage('');
    }
  };

  const handleEmailChange = async (e) => {
    const newId = e.target.value;
    setId(newId);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (newId.length === 0) {
      setEmailMessage('이메일을 입력해주세요');
    } else if (!emailRegex.test(newId)) {
      setEmailMessage('사용 불가능한 이메일입니다');
    } else {
      try {
        const emailCheckResponse = await checkEmailAvailability(newId);
        if (emailCheckResponse.success) {
          if (emailCheckResponse.response === '중복된 이메일입니다.') {
            setEmailMessage('이미 사용 중인 이메일입니다.');
          } else {
            setEmailMessage('사용 가능한 이메일입니다.');
          }
        } else {
          setEmailMessage('잠시 후에 다시 시도해주세요.');
        }
      } catch (error) {
        setEmailMessage('잠시 후에 다시 시도해주세요.');
      }
    }
  };
  

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{1,15}$/;
    setPassword(newPassword);
    setPasswordValid(passwordRegex.test(newPassword));
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleSignupComplete = async () => {
    if (
      name.length >= 2 &&
      emailMessage === '사용 가능한 이메일입니다.' &&
      passwordValid &&
      passwordMatch
    ) {
      try {
        const response = await signupUser(id, password, name, 0, photo);
        if (response.success) {
          alert('회원가입 완료');
          navigate('/login');
        } else {
          const errorMessage = response.error?.errorMessage;
          if (typeof errorMessage === 'string') {
            setSignupError(errorMessage);
          } else if (errorMessage?.password) {
            setSignupError(errorMessage.password);
          } else {
            setSignupError('잠시 후에 다시 시도해주세요.');
          }
        }
      } catch (error) {
        setSignupError('잠시 후에 다시 시도해주세요.');
      }
    } else {
      setSignupError('모든 필드를 올바르게 입력해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="absolute top-8 left-4 text-black" onClick={() => navigate('/login')}>
        <img src="/src/assets/cheveron-left.svg" alt="Logo" className="w-8 h-8" /> 
      </div>
      <div className="w-11/12 max-w-sm">
        <div className="space-y-3 mt-4">
          <input
            type="text"
            placeholder="이름"
            className="w-full px-4 py-2 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#94caff] placeholder-gray-500"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
          />
          <p className="h-6" style={{ color: nameMessage === '이름이 정상적으로 입력되었습니다.' ? '#94CAFF' : '#EE4D2A' }}>{nameMessage}</p>
          <input
            type="text"
            placeholder="이메일"
            className="w-full px-4 py-2 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#94caff] placeholder-gray-500"
            value={id}
            onChange={handleEmailChange}
            onBlur={handleEmailChange}
          />
          <p className="h-6" style={{ color: emailMessage === '사용 가능한 이메일입니다.' ? '#94CAFF' : '#EE4D2A' }}>{emailMessage}</p>
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-2 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#94caff] placeholder-gray-500"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className="h-6" style={{ color: passwordValid ? '#94CAFF' : '#EE4D2A' }}>
            {password && (passwordValid ? '사용 가능한 비밀번호입니다' : '사용 불가능한 비밀번호입니다')}
          </p>
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full px-4 py-2 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#94caff] placeholder-gray-500"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          <p className="h-6" style={{ color: passwordMatch ? '#94CAFF' : '#EE4D2A' }}>
            {passwordConfirm && (passwordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.')}
          </p>
          <div className="flex flex-col items-center space-y-4">
            <button
              className="w-2/3 px-4 py-2 text-white bg-[#0046FF] rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#94caff]"
              onClick={handleSignupComplete}
            >
              회원가입
            </button>
          </div>
          <p className="h-6 text-center" style={{ color: '#EE4D2A' }}>{signupError}</p>
        </div>
      </div>
    </div>
  );
}
