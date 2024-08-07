import React, { useState } from 'react';
import ChatSvg from '@/assets/svg/chat-text.svg';
import ContentSvg from '@/assets/svg/card-text.svg';
import ContentPopup from '../../components/common/ContentPopup';
import { useSelector } from 'react-redux';

export default function Schedule({
	dayTime,
	name,
	description,
	place,
	partnerName,
}) {
	const [isContent, setIsContent] = useState(false);
	const { role } = useSelector(state => state.user);

	const clickChat = () => {
		console.log('해당 chat 내용으로 이동');
	};

	const clickContent = () => {
		setIsContent(!isContent);
	};
	console.log(partnerName);
	return (
		<div className="flex h-16 p-1 px-2 mt-2 text-base bg-white rounded-lg shadow">
			<div className="flex items-center w-1/5">{dayTime}</div>
			<div className="flex flex-col justify-center w-3/5">
				<p className="font-bold text-[15px]">
					{name} ({partnerName}
					{role ? 'PB님' : '고객님'})
				</p>
				<p className="text-sm font-normal text-gray-400">{place}</p>
			</div>
			<div className="flex items-center justify-end w-1/5 pr-1">
				<img src={ContentSvg} onClick={clickContent} className="w-5 h-5 mr-2" />
				{isContent ? (
					<ContentPopup
						content={description}
						setIsContentPopup={() => setIsContent(!isContent)}
					/>
				) : (
					<></>
				)}
				<img src={ChatSvg} onClick={clickChat} />
			</div>
		</div>
	);
}
