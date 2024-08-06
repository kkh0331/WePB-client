import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// assets
import calendar from '../../assets/calendar.svg';
import messageIcon from '../../assets/chat-alt.svg';
import back from '../../assets/cheveron-left.svg';
import check from '../../assets/check.svg';

// components
import CustomCalendar from '../../components/calendar/CustomCalendar';
import EnableTime from '../../components/calendar/EnableTime';
import ButtonDouble from '../../components/button/ButtonDouble';
import ButtonActive from '../../components/button/ButtonActive';

// apis
import { makeReservation } from '../../libs/apis/reservation';
import { getAvailableTime } from '../../libs/apis/schedule';
import { useEffect } from 'react';

export default function ConsultingReservationPage() {
	const navigate = useNavigate();

	// 날짜 format yyyy-mm-dd 로 포맷 바꾸기
	const formatDate = date => {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
		const formattedDate = new Date(date).toLocaleDateString('en-CA', options);
		return formattedDate;
	};
	const [selectedTime, setSelectedTime] = useState(-1);
	const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
	const [message, setMessage] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [tmp, setTmp] = useState(0);
	/**
	 * status
	 * 0 : 입력 값 제대로 안넣었을 때
	 * 1 : 입력 값 제대로 넣고 상담 예약 성공
	 * 2 : 입력 값 제대로 넣고 상담 예약 마감 실패
	 */
	const [status, setStatus] = useState(0);
	const [Enabletimes, setEnableTimes] = useState([]);

	const clickReservationBtn = async () => {
		if (message === '' || selectedTime === -1) {
			setIsOpen(true);
			setStatus(0);
		} else {
			try {
				const response = await makeReservation({
					userId: 1,
					pbId: 2,
					content: message,
					date: formatDate(new Date(selectedDate)),
					time: selectedTime,
				});
				if (response.success) {
					// 상담 예약 성공
					setStatus(1);
				} else {
					// 상담 예약 실패
					setStatus(2);
				}
				setIsOpen(true);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const fetchTimesData = async () => {
		const response = await getAvailableTime({
			pbId: 2,
			reservationDay: formatDate(selectedDate),
		});
		setEnableTimes(response.response);
	};

	const hasToReload = () => {
		setIsOpen(false);
		setTmp(tmp + 1);
		setMessage('');
	};

	useEffect(() => {
		fetchTimesData();
	}, [selectedDate, tmp]);

	return (
		<div className="relative mb-16">
			{isOpen ? <AlertModal status={status} hasToReload={hasToReload} /> : null}
			<div className="flex items-center justify-center h-16 p-5 font-bold">
				<img
					src={back}
					className="absolute left-0 w-8 h-8 ml-5"
					onClick={() => navigate(-1)}
				/>
				<span>상담 예약하기</span>
			</div>
			<div className="flex flex-col p-5">
				<div className="flex items-center mb-5">
					<div className="bg-gray-300 rounded-full w-9 h-9" />
					<span className="text-[18px] font-bold ml-3 mr-1">권기현 팀장</span>
					<span className="text-[18px]">님과의 상담을 예약해요!</span>
				</div>
				<div>
					<div className="flex items-center gap-1 mb-1">
						<img src={calendar} className="w-6 h-6" />
						<span className="text-[15px]">
							원하시는 상담 날짜와 시간을 선택해주세요.
						</span>
					</div>
					<CustomCalendar onChange={setSelectedDate} />
					<EnableTime
						Enabletimes={Enabletimes}
						selectedTime={selectedTime}
						setSelectedTime={setSelectedTime}
					/>
					<div className="flex items-center gap-1 mt-5 mb-2">
						<img src={messageIcon} className="w-6 h-6" />
						<span className="text-[15px]">상담 메시지를 작성해주세요.</span>
					</div>
					<div className="w-full p-5 border-2 rounded-[10px]">
						<textarea
							className="w-full overflow-auto"
							placeholder="상담 메시지를 입력해주세요."
							value={message}
							onChange={e => setMessage(e.target.value)}
						/>
					</div>
				</div>
				<div className="my-5">
					<ButtonDouble
						btnCancelTxt="취소하기"
						btnConfirmTxt="완료하기"
						clickConfirmBtn={clickReservationBtn}
						clickCancelBtn={() => navigate(-1)}
					/>
				</div>
			</div>
		</div>
	);
}

const AlertModal = ({ status, hasToReload }) => {
	const navigate = useNavigate();
	return (
		<div className="absolute z-10 flex items-center justify-center w-screen h-screen">
			<div className="absolute w-full h-full bg-gray-300 opacity-50 z-11" />
			<div className="fixed shadow-md bg-white rounded-[30px] z-20 p-10 flex flex-col items-center gap-5 animate-slide-down">
				<div className="flex justify-center gap-1">
					<img src={check} className="w-7 h-7" />
					<span className="font-bold text-[18px] text-center whitespace-pre-line">
						{status === 0
							? `예약 날짜, 시간, 메시지를
							모두 입력해주세요.`
							: status === 1
								? '상담 예약이 완료되었습니다.'
								: '이미 마감된 시간입니다.'}
					</span>
				</div>
				<div className="flex items-center justify-center w-full">
					<ButtonActive
						btnTxt="확인"
						isConfirm={true}
						clickBtn={() => (status === 1 ? navigate('/home') : hasToReload())}
					/>
				</div>
			</div>
		</div>
	);
};
