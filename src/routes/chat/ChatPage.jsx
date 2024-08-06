import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChatList } from '../../libs/apis/chat';
import { useSelector } from 'react-redux';

export default function ChatPage() {
	const {id, role} = useSelector(state => state.user);
	const [chatRooms, setChatRooms] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchChatList = async () => {
		try{
			const response = await getChatList(id, role);
			setChatRooms(response.response || []);
		} catch(error){
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchChatList();
	}, [])

	return (
		<>
			<div className="flex items-center justify-center w-full h-16 px-5 font-bold">
				채팅 리스트
			</div>
			{isLoading?(
				<div className="flex items-center justify-center h-[500px]">
					<div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
				</div>
			) : (
				<>
					{chatRooms.map(chatRoom => {
						return (
							<ChatListComponent key={chatRoom.chatRoomCode} chatRoom={chatRoom}/>
						)
					})}
				</>
			)}
		</>
	);
}

const ChatListComponent = ({chatRoom}) => {
	const {role} = useSelector(state => state.user);

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
						<span className="text-[18px] font-bold">{chatRoom.partnerName} {role === 0 ? '고객' : 'PB'}</span>
						<span className="text-[13px] ml-[1vw] text-[#5B5B5B]">{chatRoom.partnerCategory}</span>
					</div>
					{/* <span className="text-[18px] text-[#8F8F8F]">18:22</span> */}
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex-1 w-24 truncate">
						{chatRoom.lastMessage}
					</div>
					{
						chatRoom.unCheckedMessageCount === 0 ?
						<></> :
						<div className="flex items-center justify-center flex-shrink-0 w-6 h-6 bg-red-500 rounded-full ml-[2vw]">
							{chatRoom.unCheckedMessageCount}
						</div>
					}
				</div>
			</div>
		</div>
	);
};
