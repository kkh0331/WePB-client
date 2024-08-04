import React, { useState } from 'react';
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
  const [assetError, setAssetError] = useState('');

  const [nameConnected, setNameConnected] = useState(false);
  const [nameError, setNameError] = useState('');
  const [idError, setIdError] = useState('');
  const [idChecked, setIdChecked] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [signupError, setSignupError] = useState('');

  const handleNameConnect = () => {
    const koreanRegex = /^[가-힣]+$/;
    if (name.length < 2 || !koreanRegex.test(name)) {
      setNameError('이름을 2글자 이상 한글로 입력해주세요');
    } else {
      setNameError('');
      setIsModalOpen(true);
    }
  };

  const handleIdChange = (e) => {
    const newId = e.target.value;
    setId(newId);

    if (newId.length === 0) {
      setIdError('아이디를 입력해주세요');
    } else if (newId.length < 4) {
      setIdError('사용 불가능한 아이디입니다');
    } else {
      setIdError('');
    }
  };

  const handleIdCheck = () => {
    if (id.length >= 4) {
      setIdChecked(true);
      setIdError(''); 
    } //중복검사 로직 어떻게 될지 몰라서, 무조건 패스되는걸로 틀만 짜놨음. 아이디를 점유한단 의미로 확인하는 순간 락인
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,15}$/; //오류메세지 보고 구현해뒀음
    setPassword(newPassword);
    setPasswordValid(passwordRegex.test(newPassword));
  };
  
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    setPasswordMatch(e.target.value === password);
  };
  

  const handleAssetConnect = () => {
    if (isNaN(asset) || asset.trim() === '') {
      setAssetError('숫자를 입력해주세요');
    } else {
      setAssetError('');
      setNameConnected(true);
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
        setSignupError('회원가입 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setSignupError('회원가입 중 오류가 발생했습니다.');
    }
  }; //오류처리 세분화..할게요

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <button className="absolute top-8 left-4 text-black" onClick={() => navigate('/login')}>
        &lt;
      </button>
      <div className="w-11/12 max-w-sm">
        <div className="space-y-4">
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="이름"
              className="w-2/3 px-4 py-2 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={nameConnected}
            />
            <button
              className="px-4 py-2 font-bold text-black bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
              onClick={handleNameConnect}
              disabled={nameConnected}
            >
              자산연결
            </button>
          </div>
          <p className="h-6" style={{ color: nameConnected ? '#94CAFF' : '#EE4D2A' }}>
            {nameError || (nameConnected && '자산연결이 완료되었습니다')}
          </p>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="아이디"
              className="w-2/3 px-4 py-2 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={id}
              onChange={handleIdChange}
              disabled={idChecked}
            />
            <button
              className="px-4 py-2 font-bold text-black bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
              onClick={handleIdCheck}
              disabled={idChecked || idError !== ''}
            >
              중복확인
            </button>
          </div>
          <p className="h-6" style={{ color: idError || idChecked ? (idError ? '#EE4D2A' : '#94CAFF') : '#000' }}>
            {idError || (idChecked ? '사용 가능한 아이디입니다' : '')}
          </p>
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-2 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className="h-6" style={{ color: passwordValid ? '#94CAFF' : '#EE4D2A' }}>
            {password && (passwordValid ? '사용 가능한 비밀번호입니다' : '사용 불가능한 비밀번호입니다')}
          </p>
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full px-4 py-2 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          <p className="h-6" style={{ color: passwordMatch ? '#94CAFF' : '#EE4D2A' }}>
            {passwordConfirm && (passwordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.')}
          </p>
          <button
            className="w-full px-4 py-2 font-bold text-black bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSignupComplete}
          >
            회원가입
          </button>
          <p className="h-6 text-center" style={{ color: '#EE4D2A' }}>
  {signupError}
</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12">
            <h2 className="mb-4 text-xl font-bold text-center">자산 입력</h2>
            <div className="relative w-full">
              <input
                type="text"
                placeholder=""
                className="w-full px-4 py-2 pr-12 text-black border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">원</span>
            </div>
            <p className="h-6 text-center" style={{ color: '#EE4D2A' }}>
              {assetError}
            </p>
            <button
              className="w-full px-4 py-2 mt-4 font-bold text-black bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
