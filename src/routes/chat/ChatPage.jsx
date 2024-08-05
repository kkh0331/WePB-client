import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatPage() {
	return (
		<>
			<div className="flex items-center justify-center w-full h-16 px-5 font-bold">
				채팅 리스트
			</div>
			<ChatListComponent />
			<ChatListComponent />
		</>
	);
}

const ChatListComponent = () => {
	const navigate = useNavigate();
	return (
		<div
			className="h-[11vh] px-[6vw] bg-white flex flex-row items-center border-y-[1px]"
			onClick={() => navigate('room')}
		>
			<div className="flex-shrink-0 w-16 h-16 bg-gray-300 rounded-full" />
			<div className="mx-[3vw] w-full">
				<div className="flex flex-row justify-between">
					<div>
						<span className="text-[18px] font-bold">권기현 팀장</span>
						<span className="text-[13px] ml-[1vw] text-[#5B5B5B]">상품 1</span>
					</div>
					<span className="text-[18px] text-[#8F8F8F]">18:22</span>
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex-1 w-24 truncate">
						안녕하세요~ 답장 늦어서 지송~
					</div>
					<div className="flex items-center justify-center flex-shrink-0 w-6 h-6 bg-red-500 rounded-full ml-[2vw]">
						3
					</div>
				</div>
			</div>
		</div>
	);
};
