import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setNickname } from '../../store/reducers/user';

export default function MyPage() {

	/*const nickname = useSelector(state => state.user.nickname); 
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(nickname);
		dispatch(setNickname('하이')); 
	}, [nickname]);
	*/

	return <div>MyPage</div>;
}


// redux 테스트코드

/*
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/reducers/user';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const user = useSelector(state => state.user.user); 
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setError('로그인이 되어있지 않습니다.');
    } else {
      console.log(user);
    }
  }, [user]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <div>ID: {user?.id}</div>
          <div>Name: {user?.name}</div>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      )}
    </div>
  );
}

  */

