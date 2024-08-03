import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNavigation() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const handleNavigation = path => {
		navigate(path);
	};

	const navClass = navName => {
		return pathname.startsWith(`/${navName}`)
			? 'text-blue-600 dark:text-blue-500'
			: 'text-gray-500 dark:text-gray-400';
	};

	return (
		<div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
			<div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
				<button
					type="button"
					className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
					onClick={() => handleNavigation('/home')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`w-5 h-5 mb-2 ${navClass('home')}`}
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							fillRule="evenodd"
							d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
							clipRule="evenodd"
						/>
					</svg>
					<span className={`text-sm ${navClass('home')}`}>Home</span>
				</button>
				<button
					type="button"
					className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
					onClick={() => handleNavigation('/calendar')}
				>
					<svg
						className={`w-5 h-5 mb-2 ${navClass('calendar')}`}
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							fillRule="evenodd"
							d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
							clipRule="evenodd"
						/>
					</svg>

					<span className={`text-sm ${navClass('calendar')}`}>Calendar</span>
				</button>
				<button
					type="button"
					className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
					onClick={() => handleNavigation('/chat')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`w-5 h-5 mb-2 ${navClass('chat')}`}
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							fillRule="evenodd"
							d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
							clipRule="evenodd"
						/>
					</svg>

					<span className={`text-sm ${navClass('chat')}`}>Chat</span>
				</button>
				<button
					type="button"
					className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
					onClick={() => handleNavigation('/my')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`w-5 h-5 mb-2 ${navClass('my')}`}
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							fillRule="evenodd"
							d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
							clipRule="evenodd"
						/>
					</svg>
					<span className={`text-sm ${navClass('my')}`}>My</span>
				</button>
			</div>
		</div>
	);
}
