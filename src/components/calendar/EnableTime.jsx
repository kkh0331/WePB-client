import React, { useEffect, useState } from 'react';

// id : 고객 id 또는 pb id
// date : 년, 월, 일 포함
// times : 불가능한 예약 시간
export default function EnableTime({
	id,
	date,
	Enabletimes,
	selectedTime,
	setSelectedTime,
}) {
	const [timeObjs, setTimeObjs] = useState([]);

	const updateTimeObjs = (timeObjs, compareTimes) => {
		return timeObjs.map(timeObj => {
			if (compareTimes.includes(timeObj.time)) {
				return { ...timeObj, isEnable: false };
			}
			return timeObj;
		});
	};

	useEffect(() => {
		// TODO id와 date을 통해 요청을 보냄
		const timeObjs = [
			{ isEnable: true, time: '9:00' },
			{ isEnable: true, time: '10:00' },
			{ isEnable: true, time: '11:00' },
			{ isEnable: true, time: '13:00' },
			{ isEnable: true, time: '14:00' },
			{ isEnable: true, time: '15:00' },
			{ isEnable: true, time: '16:00' },
			{ isEnable: true, time: '17:00' },
		];
		if (Enabletimes) {
			const updatedTimes = updateTimeObjs(timeObjs, Enabletimes);
			setTimeObjs(updatedTimes);
		} else {
			setTimeObjs(timeObjs);
		}
	}, [Enabletimes]);

	const timeClass = timeObj => {
		if (!timeObj.isEnable) return 'border-gray-200 text-gray-200';
		if (selectedTime === timeObj.time) return 'text-white bg-blue-600';
		return 'border-black';
	};

	const clickTime = timeObj => {
		if (!timeObj.isEnable) return;
		setSelectedTime(timeObj.time);
	};
	return (
		<div className="grid grid-cols-4 gap-2 my-3">
			{timeObjs.map(timeObj => {
				return (
					<div
						key={timeObj.time}
						className={`${timeClass(timeObj)} rounded-lg border h-8 flex justify-center items-center`}
						onClick={() => clickTime(timeObj)}
					>
						{timeObj.time}
					</div>
				);
			})}
		</div>
	);
}
