import React, { useEffect, useState } from 'react';
import EnableTime from '../../components/calendar/EnableTime';
import ButtonDouble from '../../components/button/ButtonDouble';
import { getAvailableTime } from '../../libs/apis/schedule';
import { useSelector } from 'react-redux';
import { addCalendar } from '../../libs/apis/calendar';
import { useNavigate } from 'react-router-dom';
import check from '../../assets/check.svg';
import ButtonActive from '../../components/button/ButtonActive';

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
	const [isOpen, setIsOpen] = useState(false);

	const [status, setStatus] = useState(0);

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
		hasToReload();
	};

	const hasToReload = () => {
		setIsOpen(false);
		setName('');
		setDescription('');
		setPlace("");
		setSelectedTime([]);
		setIsAddSchedule();
	}

	const clickEnableTimeBtn = (time) => {
		if(selectedTime.includes(time)){
			setSelectedTime(prev => prev.filter(x => x != time));
		} else {
			setSelectedTime(prev => [...prev, time]);
		}
	}

	const clickAddBtn = async () => {
		if(name === '' || selectedTime.length === 0){
			setIsOpen(true);
			setStatus(0);
			console.log(status)
			return;
		}
		const data = {
			scheduleName : name,
			scheduleDescription : description,
			schedulePlace : place,
			date : formatDate(selectedDate),
			time : selectedTime,
			id : id,
			role : role
		}
		console.log(data);
		try{
			const response = await addCalendar(data);
			console.log(response);
			if(response.success){
				setStatus(1);
			} else {
				setStatus(2);
			}
		} catch(error){
			// error 처리
			console.log(error);
			setStatus(3);
		} finally{
			setIsOpen(true);
		}
	};

	return (
		<div
			className={`${isAddSchedule ? 'flex' : 'hidden'} fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full p-3`}
		>
			{isOpen ? <AlertModal status={status} setIsOpen={() => setIsOpen(false)}/> : null}
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
					setSelectedTime={clickEnableTimeBtn}
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

const AlertModal = ({ status, setIsOpen }) => {
	const navigate = useNavigate();

	/**
	 * status
	 * 0 : 입력 값 제대로 안넣었을 때
	 * 1 : 입력 값 제대로 넣고 상담 예약 성공
	 * 2 : 입력 값 제대로 넣고 누군가가 이미 예약했을 때
	 * 3 : 일정 추가 중에 에러 발생. 다시 시도해 주세요
	 */
	const messageByStatus = (status) => {
		console.log(status);
		switch(status){
			case 0:
				return "일정 내용과 시간은 필수 선택입니다."
			case 1:
				return "예약이 완료되었습니다."
			case 2:
				return "선택하신 시간에 다른 고객님이 이미 예약했습니다."
			default:
				return "알 수 없는 에러가 발생했습니다. 다시 시도해 주세요"
		}
	}

	const clickBtn = (status) => {
		console.log(status);
		switch(status){
			case 0:
				return setIsOpen();
			case 1:
				return navigate(0)
			case 2:
				return setIsOpen();
			default:
				return setIsOpen();
		}
	}

	return (
		<div className="absolute z-10 flex items-center justify-center w-screen h-screen">
			<div className="absolute w-full h-full bg-gray-300 opacity-50 z-11" />
			<div className="fixed shadow-md bg-white rounded-[30px] z-20 p-10 flex flex-col items-center gap-5 animate-slide-down">
				<div className="flex justify-center gap-1">
					<img src={check} className="w-7 h-7" />
					<span className="font-bold text-[18px] text-center whitespace-pre-line">
						{messageByStatus(status)}
					</span>
				</div>
				<div className="flex items-center justify-center w-full">
					<ButtonActive
						btnTxt="확인"
						isConfirm={true}
						clickBtn={() => clickBtn(status)}
					/>
				</div>
			</div>
		</div>
	);
};
