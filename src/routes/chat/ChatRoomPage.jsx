import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// assets
import consulting from '../../assets/consulting.png';
import arrowUp from '../../assets/arrow-up.svg';
import back from '../../assets/cheveron-left.svg';
import { Stomp } from '@stomp/stompjs';
import { getChatContents } from '../../libs/apis/chat';
import moment from 'moment';

export default function ChatRoomPage() {
	const lastMessageRef = useRef(null);
	const navigate = useNavigate();
	const { chatRoomCode } = useParams();
	const { id, role } = useSelector(state => state.user);
	const stompClient = useRef(null);
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const partnerId =
		role === 0 ? chatRoomCode.split('chat')[1] : chatRoomCode.split('chat')[0];

	const handleInputChange = event => {
		setInputValue(event.target.value);
	};

	useEffect(() => {
		connect();
		fetchMessages();
		return () => disconnect();
	}, []);

	useEffect(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const fetchMessages = async () => {
		// 기존 채팅 메시지를 서버로부터 가져오는 함수
		try {
			const response = await getChatContents(chatRoomCode, role);
			setMessages(response.response || []);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// 웹소켓 연결 설정
	const connect = () => {
		const socket = new WebSocket('ws://localhost:8080/ws');
		stompClient.current = Stomp.over(socket);
		stompClient.current.connect({}, () => {
			stompClient.current.subscribe(`/sub/chat/${chatRoomCode}`, message => {
				// console.log(JSON.parse(message.body));
				const newMessage = JSON.parse(message.body);
				setMessages(preMessage => [...preMessage, newMessage]);
			});
		});
	};

	// 웹소켓 연결 해제
	const disconnect = () => {
		if (stompClient.current) {
			stompClient.current.disconnect;
		}
	};

	// 메시지 전송
	const sendMessage = () => {
		if (stompClient.current && inputValue) {
			const body = {
				roomId: chatRoomCode,
				userId: id,
				role: role,
				message: inputValue,
			};
			stompClient.current.send('/pub/message', {}, JSON.stringify(body));
			setInputValue('');
		}
	};

	return (
		<div className="flex flex-col h-screen overflow-y-hidden">
			<div className="flex items-center justify-center h-16 p-5 font-bold">
				<img
					src={back}
					className="absolute left-0 w-8 h-8 ml-5"
					onClick={() => navigate(-1)}
				/>
				<span>채팅</span>
			</div>
			<ChatPartnerInfo />
			{isLoading ? (
				<div className="flex items-center justify-center h-[500px]">
					<div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
				</div>
			) : (
				<div className="flex flex-col flex-1 w-full px-5 mt-6 mb-32 overflow-y-scroll">
					{messages.map(message => {
						return id === message.sender_id ? (
							<ChatSenderComponent
								key={message.id}
								message={message.message}
								time={message.send_time}
							/>
						) : (
							<ChatReceiverComponent
								key={message.id}
								message={message.message}
								time={message.send_time}
							/>
						);
					})}
					<div ref={lastMessageRef} />
				</div>
			)}
			<ChatInputComponent
				inputValue={inputValue}
				handleInputChange={handleInputChange}
				sendMessage={sendMessage}
			/>
		</div>
	);
}

const ChatPartnerInfo = () => {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-between px-5">
			<div className="flex">
				<div className="w-12 h-12 bg-gray-300 rounded-full" />
				<div className="flex flex-col justify-center mx-4">
					<span className="text-[18px] font-bold">권기현 팀장</span>
					<span className="text-[13px]">머시기저시기 담당</span>
				</div>
			</div>
			<button
				className="flex flex-col items-center justify-center"
				onClick={() => navigate('../reservation')}
			>
				<img src={consulting} className="w-5" />
				<span className="text-[12px] mt-1">상담 신청하기</span>
			</button>
		</div>
	);
};

const ChatSenderComponent = ({ time, message }) => {
	return (
		<div className="flex self-end">
			<span className="text-[12px] text-[#8F8F8F] mb-2 mr-2 flex items-end">
				{moment(time).format('HH:mm')}
			</span>
			<div className="px-5 py-2 bg-[#D8E2FF] w-fit rounded-[10px] my-2">
				<span className="text-[17px]">{message}</span>
			</div>
		</div>
	);
};

const ChatReceiverComponent = ({ time, message }) => {
	return (
		<div className="flex flex-end">
			<div className="px-5 py-2 bg-[#F1F1F1] w-fit rounded-[10px] my-2">
				<span className="text-[17px]">{message}</span>
			</div>
			<span className="text-[12px] text-[#8F8F8F] mb-2 ml-2 flex items-end">
				{moment(time).format('HH:mm')}
			</span>
		</div>
	);
};

const ChatInputComponent = ({ inputValue, handleInputChange, sendMessage }) => {
	return (
		<div className="fixed bottom-0 flex items-center justify-center flex-shrink-0 w-full mb-20">
			<div className="border-2 rounded-[20px] py-2 px-3 w-11/12 flex justify-between bg-white">
				<input
					className="flex-1 ml-2 mr-4 bg-white"
					type="text"
					value={inputValue}
					onChange={handleInputChange}
				/>
				<button
					className="bg-[#0046FF] p-[6px] rounded-full"
					onClick={sendMessage}
				>
					<img src={arrowUp} />
				</button>
			</div>
		</div>
	);
};
