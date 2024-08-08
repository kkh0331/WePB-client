import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import profile from '../../assets/profile.svg';

export default function ChatPage() {
	const { chatRooms } = useSelector(state => state.chat);

	useEffect(() => {
		console.log(chatRooms);
	}, [chatRooms]);

	return (
		<>
			<div className="relative flex items-center justify-center w-full h-16 font-sans text-xl font-bold bg-white border-t border-gray-200 shadow">
				채팅 리스트
			</div>
			<div className="flex flex-col divide-y-[1px] border-b-[1px]">
				{chatRooms?.length > 0 ? (
					chatRooms.map(chatRoom => {
						return (
							<ChatListComponent
								key={chatRoom.chatRoomCode}
								chatRoom={chatRoom}
							/>
						);
					})
				) : (
					<div className="w-full flex justify-center items-center h-[70vh]">
						<span>해당 내역이 없습니다.</span>
					</div>
				)}
			</div>
		</>
	);
}

const ChatListComponent = ({ chatRoom }) => {
	const { role } = useSelector(state => state.user);

	const navigate = useNavigate();
	return (
		<div
			className="h-[11vh] px-[6vw] bg-white flex flex-row items-center"
			onClick={() => navigate(chatRoom.chatRoomCode)}
		>
			<img
				src={profile}
				onError={e => {
					e.target.src = profile;
				}}
				className="flex items-center justify-center w-16 h-16 rounded-full"
			/>
			<div className="mx-[3vw] w-full">
				<div className="flex flex-row justify-between">
					<div>
						<span className="text-[18px] font-bold">
							{chatRoom.partnerName} {role === 0 ? '고객' : 'PB'}
						</span>
						<span className="text-[13px] ml-[1vw] text-[#5B5B5B]">
							{chatRoom.partnerCategory}
						</span>
					</div>
					<span className="text-[15px] text-[#8F8F8F]">
						{moment(chatRoom.lastMessageTime).format('HH:mm')}
					</span>
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex-1 w-24 truncate">{chatRoom.lastMessage}</div>
					{chatRoom.unCheckedMessageCount === 0 ? (
						<></>
					) : (
						<div className="flex items-center justify-center flex-shrink-0 w-6 h-6 bg-red-500 rounded-full ml-[2vw] text-white">
							{chatRoom.unCheckedMessageCount}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
