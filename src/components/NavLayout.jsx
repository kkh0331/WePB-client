import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Alarm from './Alarm';
import { Stomp } from '@stomp/stompjs';
import { useDispatch, useSelector } from 'react-redux';
import { setChatRooms, setLastMessageTime } from '../store/reducers/chat';
import { getChatList } from '../libs/apis/chat';

export default function NavLayout() {
	const { id, role } = useSelector(state => state.user);
	const {lastMessageTime} = useSelector(state => state.chat);
	const [isAlarmOpen, setIsAlarmOpen] = useState(false);
	const location = useLocation();
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const dispatch = useDispatch();
	const stompClient = useRef(null);

	const pathnameRef = useRef(location.pathname);
	const lastMessageTimeRef = useRef(lastMessageTime);

	useEffect(() => {
    lastMessageTimeRef.current = lastMessageTime;
  }, [lastMessageTime]);

	useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

	const connect = () => {
		const socket = new WebSocket('ws://localhost:8080/ws');
		stompClient.current = Stomp.over(socket);
		stompClient.current.connect({}, () => {
			stompClient.current.subscribe(`/sub/user/${id}`, message => {
				const newChatRooms = JSON.parse(message.body);
				newChatRooms.sort((a, b) => {
					return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
				});
				dispatch(setChatRooms(newChatRooms));
				if(newChatRooms.length > 0){
					const newLastMessage = newChatRooms[0];
					if(lastMessageTimeRef.current === "" || lastMessageTimeRef.current < newLastMessage.lastMessageTime){
						setName(newLastMessage.partnerName)
						if(newLastMessage.lastMessage === ''){
							setMessage('새로운 채팅방이 생성되었습니다.')
						} else {
							setMessage(newLastMessage.lastMessage)
						}
						dispatch(setLastMessageTime(newLastMessage.lastMessageTime))
						if(!pathnameRef.current.startsWith('/chat')){
							setIsAlarmOpen(true);
						}
					}
				}
			});
		});
	};
 
	const disconnect = () => {
		if (stompClient.current) {
			stompClient.current.disconnect();
		}
	};

	useEffect(() => {
		if (id !== '') {
			connect();
			fetchChatList();
		}
		return () => disconnect();
	}, [id]);

	const fetchChatList = async () => {
		try{
			const response = await getChatList(id, role);
			console.log(response);
			const res = response.response;
			res.sort((a, b) => {
				return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
			});
			dispatch(setChatRooms(res));
			if(res.length > 0){
				dispatch(setLastMessageTime(res[0].lastMessageTime))
			}
		} catch(error){
			console.log(error);
			dispatch(setChatRooms({chatRooms : []}));
		}
	}

	return (
		<>
			{isAlarmOpen ? <Alarm setIsAlarmOpen={() => setIsAlarmOpen(false)} isAlarmOpen={isAlarmOpen} name={name} message={message}/> : <></>}
			<Outlet />
			<BottomNavigation />
		</>
	);
}
