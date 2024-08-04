import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// layout
import NavLayout from '../components/NavLayout';
import ChatLayout from '../routes/chat/ChatLayout';

// pages
import HomePage from '../routes/home/HomePage';
import CalendarPage from '../routes/calendar/CalendarPage';
import ChatPage from '../routes/chat/ChatPage';
import MyPage from '../routes/my/MyPage';
import LoginPage from '../routes/login/LoginPage';
import SignupPage from '../routes/login/SignupPage';
import ChatRoomPage from '../routes/chat/ChatRoomPage';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage />,
		index: true,
	},
	{
		path: '/signup',
		element: <SignupPage />,
		index: true,
	},
	{
		path: '',
		element: <NavLayout />,
		children: [
			{
				path: '/home',
				element: <HomePage />,
				index: true,
			},
			{
				path: '/calendar',
				element: <CalendarPage />,
				index: true,
			},
			{
				path: '/chat',
				element: <ChatLayout />,
				children: [
					{
						path: '',
						element: <ChatPage />,
						index: true,
					},
					{
						path: 'room',
						element: <ChatRoomPage />,
						index: true,
					},
				],
			},
			{
				path: '/my',
				element: <MyPage />,
				index: true,
			},
		],
	},
]);

export default router;
