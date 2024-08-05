import React from 'react';
import { useNavigate } from 'react-router-dom';

// assets
import calendar from '../../assets/calendar.svg';
import message from '../../assets/chat-alt.svg';
import back from '../../assets/cheveron-left.svg';

// components
import CustomCalendar from '../../components/calendar/CustomCalendar';
import EnableTime from '../../components/calendar/EnableTime';
import ButtonDouble from '../../components/button/ButtonDouble';

export default function ConsultingReservationPage() {
	const navigate = useNavigate();
	return (
		<div className="mb-16">
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
						<img src={calendar} />
						<span>원하시는 상담 날짜와 시간을 선택해주세요.</span>
					</div>
					<CustomCalendar />
					<EnableTime />
					<div className="flex items-center gap-1 mt-5 mb-2">
						<img src={message} />
						<span>상담 메시지를 작성해주세요.</span>
					</div>
					<div className="w-full p-5 border-2 rounded-[10px]">
						<textarea
							className="w-full overflow-auto"
							placeholder="상담 메시지를 입력해주세요."
						/>
					</div>
				</div>
				<div className="my-5">
					<ButtonDouble btnCancelTxt="취소하기" btnConfirmTxt="완료하기" />
				</div>
			</div>
		</div>
	);
}
