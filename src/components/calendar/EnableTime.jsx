import React, { useEffect, useState } from 'react';

// id : 고객 id 또는 pb id
// date : 년, 월, 일 포함
export default function EnableTime({ id, date, selectedTime, setSelectedTime }) {
	const [timeObjs, setTimeObjs] = useState([]);

	useEffect(() => {
		// TODO id와 date을 통해 요청을 보냄
		const timeObjs = [
			{ isEnable: false, time: '10:00' },
			{ isEnable: true, time: '11:30' },
			{ isEnable: false, time: '13:30' },
			{ isEnable: true, time: '14:30' },
			{ isEnable: false, time: '15:30' },
			{ isEnable: true, time: '16:20' },
			{ isEnable: true, time: '17:00' },
			{ isEnable: false, time: '18:00' },
		];
		setTimeObjs(timeObjs);
	}, []);

  const timeClass = (timeObj) => {
    if(!timeObj.isEnable) return "border-gray-200 text-gray-200";
    if(selectedTime === timeObj.time) return "text-white bg-blue-600"
    return "border-black"; 
  }

  const clickTime = (timeObj) => {
    if(!timeObj.isEnable) return;
    setSelectedTime(timeObj.time);
  }

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
