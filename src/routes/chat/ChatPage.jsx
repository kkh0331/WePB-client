import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function ChatPage() {
	const { chatRooms } = useSelector(state => state.chat);
	const {id} = useSelector(state => state.user);

	return (
		<div className='flex flex-col h-screen'>
			<div className="flex items-center justify-center w-full h-16 px-5 text-xl font-bold">
				채팅 리스트
			</div>
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
				<div className="flex justify-center items-center flex-1">
					<span>{id === '' ? '로그인 후 진행해 주세요' : '해당 내역이 없습니다'}</span>
				</div>
			)}
		</div>
	);
}

const ChatListComponent = ({ chatRoom }) => {
	const { role } = useSelector(state => state.user);

	const navigate = useNavigate();
	return (
		<div
			className="h-[11vh] px-[6vw] bg-white flex flex-row items-center border-y-[1px]"
			onClick={() => navigate(chatRoom.chatRoomCode)}
		>
			<div className="flex-shrink-0 w-16 h-16 bg-gray-300 rounded-full" />
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
					<span className="text-[18px] text-[#8F8F8F]">
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
