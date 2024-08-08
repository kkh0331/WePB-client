import React, { useState } from 'react';
import ChatSvg from '@/assets/svg/chat-text.svg';
import ContentSvg from '@/assets/svg/card-text.svg';
import ContentPopup from '../../components/common/ContentPopup';
import { createRoom } from '../../libs/apis/chat';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Schedule({ dayTime, name, description, place, pbId }) {
	const [isContent, setIsContent] = useState(false);
	const { id, role } = useSelector(state => state.user);
	const navigate = useNavigate();

	const clickContent = () => {
		setIsContent(!isContent);
	};

	const clickCreateRoom = async () => {
		try {
			const response = await createRoom(id, pbId, role);
			console.log(response);
			if (response.status === 200) {
				// enterRoom
				navigate(`../chat/${pbId}chat${id}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex h-16 p-1 px-2 mt-2 text-base bg-white rounded-lg shadow">
			<div className="flex items-center w-1/5" onClick={clickContent}>
				{dayTime}
			</div>
			<div
				className="flex flex-col justify-center w-3/5"
				onClick={clickContent}
			>
				<p className="text-lg font-bold">
					{name}
					{/* {partnerName
						? ` (${partnerName}
					${partnerName && role ? 'PB님' : '고객님'})`
						: null} */}
				</p>
				<p className="text-sm font-normal text-gray-400">{place}</p>
			</div>
			<div className="flex items-center justify-end w-1/5 pr-1">
				{/* <img src={ContentSvg} onClick={clickContent} className='w-5 h-5 mr-2'/> */}
				{isContent ? (
					<ContentPopup
						content={description}
						setIsContentPopup={() => setIsContent(!isContent)}
					/>
				) : (
					<></>
				)}
				<img src={ChatSvg} onClick={() => clickCreateRoom(pbId)} />
			</div>
		</div>
	);
}
