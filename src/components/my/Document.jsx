import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ContentSvg from '@/assets/svg/card-text.svg';
import ContentPopup from '../common/ContentPopup';

export default function Document({ document }) {
	const { role } = useSelector(state => state.user);
	const [time, setTime] = useState('');
	const [title, setTitle] = useState('');
  const [isContent, setIsContent] = useState(false);

	useEffect(() => {
		setTime(changeTimeFormat);
		setTitle(changeTitleFormat);
	}, [document]);

	const changeTimeFormat = () => {
		const hour = document.time.substr(0, 2);
		const minute = document.time.substr(2, 2);
		return `${hour}:${minute}`;
	};

	const changeTitleFormat = () => {
		const name = document.name;
		return role === 0 ? `${name} 고객님 요청` : `${name} PB님에게 요청`;
	};

	return (
		<div className="bg-white p-2 rounded-lg mt-1 flex shadow">
			<p className="w-1/5">{time}</p>
			<p className="w-3/5">{title}</p>
			<div className="w-1/5 flex justify-end items-center mr-1">
				<img src={ContentSvg} className='w-5 h-5' onClick={() => setIsContent(!isContent)}/>
        {isContent ? <ContentPopup partnerName={document.name} content={document.content} setIsContentPopup={() => setIsContent(!isContent)} dayTime={time}/> : <></>}
			</div>
		</div>
	);
}
