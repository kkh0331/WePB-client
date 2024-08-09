import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Alarm({ name, message, isAlarmOpen, setIsAlarmOpen }) {
	const { role } = useSelector(state => state.user);

	useEffect(() => {
		if (isAlarmOpen) {
			setTimeout(() => {
				setIsAlarmOpen();
			}, 3000);
		}
	}, [isAlarmOpen]);

	return (
		<div
			className="fixed w-full top-0 z-50 mt-1 flex justify-center animate-slide-down animate-slide-up p-3"
		>
			<div className="relative flex w-full rounded-2xl p-4 bg-gray-100 bg-opacity-80 border">
				<div
					role="button"
					className="absolute rounded-lg p-1 right-0 top-0 mr-2 mt-2"
					onClick={() => setIsAlarmOpen()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</div>
				<div className="px-2 w-full ">
					<div>
						<span className="text-xl font-bold text-blue-700">
							{name} {role === 0 ? '고객' : 'PB'}
						</span>
						님
					</div>
					<div className="mt-3 break-words">{message}</div>
				</div>
			</div>
		</div>
	);
}
