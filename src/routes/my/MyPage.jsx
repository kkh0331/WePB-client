import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../../store/reducers/user';

export default function MyPage() {
	const {id, name, role} = useSelector(state => state.user); // store 값 불러오기
	// const dispatch = useDispatch();

	useEffect(() => {
		console.log(name);
		// dispatch(setNickname('하이')); //닉네임 변경
	}, [name]);

	return <div>MyPage</div>;
}
