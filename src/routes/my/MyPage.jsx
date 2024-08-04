import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../../store/reducers/user';

export default function MyPage() {
	const nickname = useSelector(state => state.user.nickname); // store 값 불러오기
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(nickname);
		dispatch(setNickname('하이')); //닉네임 변경
	}, [nickname]);

	return <div>MyPage</div>;
}
