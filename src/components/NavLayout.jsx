import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Alert from './Alert';
import { Stomp } from '@stomp/stompjs';
import { useDispatch, useSelector } from 'react-redux';
import { setChatRooms } from '../store/reducers/chat';
import { getChatList } from '../libs/apis/chat';

export default function NavLayout() {
	const { id, role } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const stompClient = useRef(null);

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
			const res = response.response;
			res.sort((a, b) => {
				return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
			});
			dispatch(setChatRooms(res));
		} catch(error){
			console.log(error);
		}
	}

	return (
		<>
			{/* <Alert/> */}
			<Outlet />
			<BottomNavigation />
		</>
	);
}
