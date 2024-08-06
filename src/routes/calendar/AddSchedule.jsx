import React, { useEffect, useState } from 'react';
import EnableTime from '../../components/calendar/EnableTime';
import ButtonDouble from '../../components/button/ButtonDouble';
import { getAvailableTime } from '../../libs/apis/schedule';
import { useSelector } from 'react-redux';

export default function AddSchedule({
	isAddSchedule,
	setIsAddSchedule,
	selectedDate,
}) {
	// 날짜 format yyyy-mm-dd 로 포맷 바꾸기
	const formatDate = date => {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
		const formattedDate = new Date(date).toLocaleDateString('en-CA', options);
		return formattedDate;
	};
	const { id, role } = useSelector(state => state.user);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [place, setPlace] = useState('');
	const [selectedTime, setSelectedTime] = useState([]);
	const [enableTimes, setEnableTimes] = useState([]);

	const fetchEnableTimes = async () => {
		const response = await getAvailableTime({
			pbId: id,
			reservationDay: formatDate(selectedDate),
		});
		setEnableTimes(response.response);
	};
	useEffect(() => {
		if (isAddSchedule) {
			fetchEnableTimes();
		}
	}, [isAddSchedule]);

	const clickCancelBtn = () => {
		setName('');
		setDescription('');
		setSelectedTime('');
		setIsAddSchedule();
		console.log('취소');
	};

	const clickAddBtn = () => {
		//TODO 데이터 보내기
		setIsAddSchedule();
		console.log('추가');
	};

	return (
		<div
			className={`${isAddSchedule ? 'flex' : 'hidden'} fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full p-3`}
		>
			<div className="w-full p-3 bg-white rounded-xl">
				<div className="w-full mb-3 text-2xl font-bold text-center">
					개별일정추가
				</div>
				<input
					className="w-full px-2 my-1 border border-gray-200 rounded-lg h-9"
					placeholder="일정 내용"
					type="text"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<input
					className="w-full px-2 my-1 border border-gray-200 rounded-lg h-9"
					placeholder="일정 세부사항 (선택사항)"
					type="text"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<input
					className="w-full px-2 my-1 border border-gray-200 rounded-lg h-9"
					placeholder="장소 (선택사항)"
					type="text"
					value={place}
					onChange={e => setPlace(e.target.value)}
				/>
				<EnableTime
					isAddSchedule={true}
					Enabletimes={enableTimes}
					selectedTime={selectedTime}
					setSelectedTime={time => setSelectedTime(time)}
				/>
				<ButtonDouble
					btnCancelTxt={'닫기'}
					btnConfirmTxt={'추가'}
					clickCancelBtn={clickCancelBtn}
					clickConfirmBtn={clickAddBtn}
				/>
			</div>
		</div>
	);
}
