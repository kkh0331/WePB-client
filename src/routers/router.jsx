import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/routes/MainPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />,
		index: true,
	},
]);

export default router;
