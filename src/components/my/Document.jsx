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
		<div
			className="flex p-2 mt-1 bg-white rounded-lg shadow-md"
			onClick={() => setIsContent(!isContent)}
		>
			<p className="w-1/5">{time}</p>
			<p className="w-3/5">{title}</p>
			<div className="flex items-center justify-end w-1/5 mr-1">
				{/* <img
					src={ContentSvg}
					className="w-5 h-5"
					onClick={() => setIsContent(!isContent)}
				/> */}
				{isContent ? (
					<ContentPopup
						content={document.content}
						setIsContentPopup={() => setIsContent(!isContent)}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
