import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../libs/apis/signin';

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [asset, setAsset] = useState('');
  const [tempAsset, setTempAsset] = useState(''); 
  const [assetError, setAssetError] = useState('');

  const [nameError, setNameError] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [signupError, setSignupError] = useState('');

  const modalRef = useRef(null);

  const handleNameConnect = () => {
    const koreanRegex = /^[가-힣]+$/;
    if (name.length < 2 || !koreanRegex.test(name)) {
      setNameError('이름을 2글자 이상 한글로 입력해주세요.');
    } else {
      setNameError('');
      setTempAsset(asset); 
      setIsModalOpen(true);
    }
  };

  const handleIdChange = (e) => {
    const newId = e.target.value;
    setId(newId);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (newId.length === 0) {
      setIdError('이메일을 입력해주세요');
    } else if (!emailRegex.test(newId)) {
      setIdError('사용 불가능한 이메일입니다');
    } else {
      setIdError('');
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

  const handleAssetChange = (e) => {
    setTempAsset(e.target.value); 
  };

  const handleAssetConnect = () => {
    if (isNaN(tempAsset) || tempAsset.trim() === '') {
      setAssetError('숫자를 입력해주세요');
    } else {
      setAssetError('');
      setAsset(tempAsset); 
      setIsModalOpen(false);
    }
  };

  const handleSignupComplete = async () => {
    try {
      const response = await signupUser(id, password, name, parseInt(asset));
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
          setSignupError('회원가입 중 오류가 발생했습니다.');
        }
      }
    } catch (error) {
      setSignupError('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setTempAsset(asset); 
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4" onClick={handleCloseModal}>
      <div className="absolute top-8 left-4 text-black" onClick={() => navigate('/login')}>
      <img src="https://i.postimg.cc/zXdJMJrq/pngwing-com.png" alt="Logo" className="w-8 h-8" /> 
      </div>
      <div className="w-11/12 max-w-sm">
        <div className="space-y-3 mt-4">
          <input
            type="text"
            placeholder="이름"
            className="w-full px-4 py-2 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#94caff] placeholder-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="h-6" style={{ color: '#EE4D2A' }}>{nameError}</p>
          <input
            type="text"
            placeholder="이메일"
            className="w-full px-4 py-2 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#94caff] placeholder-gray-500"
            value={id}
            onChange={handleIdChange}
          />
          <p className="h-6" style={{ color: idError ? '#EE4D2A' : '#000' }}>{idError}</p>
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
              className="w-2/3 px-4 py-2 text-white bg-[#0046FF] rounded-lg shadow-md"
              onClick={handleNameConnect}
            >
              자산연결
            </button>
            <div className="mt-4"></div>
            <button
              className="w-2/3 px-4 py-2 text-black bg-[#97A4B2] rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#94caff]"
              onClick={handleSignupComplete}
            >
              회원가입
            </button>
          </div>
          <p className="h-6 text-center" style={{ color: '#EE4D2A' }}>{signupError}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-11/12" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-4 text-xl font-bold text-center">자산 입력</h2>
            <div className="relative w-full">
              <input
                type="text"
                placeholder=""
                className="w-full px-4 py-2 pr-12 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#94caff] placeholder-gray-500"
                value={tempAsset}
                onChange={handleAssetChange}
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">원</span>
            </div>
            <p className="h-6 text-center" style={{ color: '#EE4D2A' }}>{assetError}</p>
            <button
              className="w-full px-4 py-2 mt-4 font-bold text-black bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#94caff]"
              onClick={handleAssetConnect}
            >
              자산 연결하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
