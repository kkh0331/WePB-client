import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// assets
import calendar from '../../assets/calendar.svg';
import messageIcon from '../../assets/chat-alt.svg';
import back from '../../assets/cheveron-left.svg';
import check from '../../assets/check.svg';
import profile from '../../assets/profile.svg';

// components
import CustomCalendar from '../../components/calendar/CustomCalendar';
import EnableTime from '../../components/calendar/EnableTime';
import ButtonDouble from '../../components/button/ButtonDouble';
import ButtonActive from '../../components/button/ButtonActive';

// apis
import { makeReservation } from '../../libs/apis/reservation';
import { getAvailableTime } from '../../libs/apis/schedule';
import { getPartnerNmCg } from '../../libs/apis/chat';
import moment from 'moment';
import AlertModal from '../../components/common/AlertModal';

export default function ConsultingReservationPage() {
	const navigate = useNavigate();

	// 날짜 format yyyy-mm-dd 로 포맷 바꾸기
	const formatDate = date => {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
		const formattedDate = new Date(date).toLocaleDateString('en-CA', options);
		return formattedDate;
	};
	const { id, role } = useSelector(state => state.user);
	const [selectedTime, setSelectedTime] = useState(-1);
	const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
	const [message, setMessage] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [tmp, setTmp] = useState(0);
	const [partnerName, setPartnerName] = useState('');
	const { chatRoomCode } = useParams();
	const [photo, setPhoto] = useState("");
	const partnerId =
		role === 0 ? Number(chatRoomCode.split('chat')[1]) : Number(chatRoomCode.split('chat')[0]);
	// console.log(partnerId)
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
		} 
		else if(moment(new Date()).format("YYYYMMDD") > moment(selectedDate).format("YYYYMMDD")){
			setIsOpen(true);
			setStatus(3);
		} else {
			try {
				const response = await makeReservation({
					userId: id,
					pbId: partnerId,
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
			pbId: partnerId,
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

	useEffect(() => {
		fetchPartnerName();
	}, []);


	const fetchPartnerName = async () => {
		try {
			const response = await getPartnerNmCg(partnerId);
			setPartnerName(response.response.name);
			setPhoto(response.response.photo);
		} catch (error) {
			console.log(error);
		}
	};

	{status === 0
		? `예약 날짜, 시간, 메시지를
		모두 입력해주세요.`
		: status === 1
			? '상담 예약이 완료되었습니다.'
			: status === 3
			? '과거의 날짜는 선택할 수 없습니다.' : '이미 마감된 시간입니다.'}

	const alertMessage = (status) => {
		switch(status){
			case 0:
				return "예약 날짜, 시간, 메시지를 모두 입력해주세요."
			case 1:
				return "상담 예약이 완료되었습니다."
			case 3:
				return "과거의 날짜는 선택할 수 없습니다."
			default:
				return "이미 마감된 시간입니다."
		}
	}

	const alertClickBtn = (status) => {
		if(status === 1){
			navigate('/home')
		} else {
			hasToReload()
		}
	}

	return (
		<div className="relative mb-16">
			{isOpen ? <AlertModal status={status} message={alertMessage} clickBtn={alertClickBtn} /> : null}
			<div className="relative flex items-center justify-center w-full h-16 font-sans text-xl font-bold bg-white border-t border-gray-200 shadow">
				<img
					src={back}
					className="absolute left-0 w-8 h-8 ml-5"
					onClick={() => navigate(-1)}
				/>
				<span className="text-xl">상담 예약하기</span>
			</div>
			<div className="flex flex-col p-5">
				<div className="flex items-center mb-5">
					<img
						src={photo || profile}
						onError={e => {
							e.target.src = profile;
						}}
						className="flex items-center justify-center rounded-full w-9 h-9"
					/>
					<span className="text-[18px] font-bold ml-3 mr-1">
						{partnerName} PB
					</span>
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
