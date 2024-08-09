import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeYYYYMMDD, getYM } from '../../utils/time';
import '@/assets/css/Calendar.css';
import moment from 'moment';
import Schedule from './Schedule';
import AddSchedule from './AddSchedule';
import CustomCalendar from '../../components/calendar/CustomCalendar';
import { getTodaySchedules } from '../../libs/apis/calendar';
import Loading from '../../components/common/Loading';
import { useNavigate } from 'react-router-dom';
import ButtonActive from '../../components/button/ButtonActive';
import check from '../../assets/check.svg';

export default function CalendarPage() {
	const { id, role } = useSelector(state => state.user);
	const [schedules, setSchedules] = useState([]);
	const [value, onChange] = useState(new Date());
	const [isAddSchedule, setIsAddSchedule] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchTodaySchedules();
	}, [value]);

	const fetchTodaySchedules = async () => {
		const today = moment(value).format('YYYY-MM-DD');
		setSchedules([]);
		setIsLoading(true);
		try {
			const response = await getTodaySchedules(id, today, role);
			setSchedules(response.response);
		} catch (error) {
			console.log(error);
			setSchedules([]);
		} finally {
			setIsLoading(false);
		}
	};

	const checktDate = () => {
		if(moment(new Date()).format("YYYYMMDD") <= moment(value).format("YYYYMMDD")){
			setIsAddSchedule(true);
		} else {
			setIsAlertModal(true);
		}
	}

	const [isAlertModal, setIsAlertModal] = useState(false);

	return (
		<div className="h-screen bg-indigo-50">
			<div
				className={`${isAddSchedule ? 'opacity-20' : ''} w-full h-16 bg-white border-t border-gray-200 text-xl font-sans font-bold flex justify-center items-center relative shadow`}
			>
				<div>일정</div>
				{role === 0 ? (
					<button
						className="absolute right-4"
						onClick={() => checktDate()}
					>
						+
					</button>
				) : null}
			</div>
			{isAlertModal ? <AlertModal setIsAlertModal={() => setIsAlertModal(false)}/> : null}
			<AddSchedule
				id="default-modal"
				selectedDate={value}
				isAddSchedule={isAddSchedule}
				setIsAddSchedule={setIsAddSchedule}
			/>
			<div className={`p-3 ${isAddSchedule ? 'opacity-10' : ''}`}>
				<CustomCalendar value={value} onChange={onChange} />
			</div>

			<div className={`flex-1 mt-2 mb-16 ${isAddSchedule ? 'opacity-10' : ''}`}>
				<p className="ml-3 px-1 font-black mt-2 mb-2">
					{moment(value).format('YYYY년 MM월 DD일')}
				</p>
				<div className="h-[32vh] ml-3 mr-3 overflow-y-scroll">
					{isLoading ? (
						<div className="flex items-center justify-center h-[33vh]">
							<Loading />
						</div>
					) : schedules?.length > 0 ? (
						[...schedules].map(schedule => (
							<Schedule
								key={schedule.id}
								partnerName={schedule.partnerName}
								dayTime={moment(schedule.dayTime).format('HH:mm')}
								name={schedule.scheduleName}
								place={schedule.schedulePlace}
								description={schedule.scheduleDescription}
								pbId={schedule.pbId}
								customId={schedule.customId}
							/>
						))
					) : (
						<div className="flex justify-center items-center h-[33vh]">
							<span>{id === '' ? '로그인 후 진행해 주세요' : '일정이 없습니다'}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

const AlertModal = ({ setIsAlertModal }) => {
	return (
		<div className="absolute z-10 flex items-center justify-center w-screen h-screen">
			<div className="absolute w-full h-full bg-gray-300 opacity-50 z-11" />
			<div className="fixed shadow-md bg-white rounded-[30px] z-20 p-10 flex flex-col items-center gap-5 animate-slide-down">
				<div className="flex justify-center gap-1">
					<img src={check} className="w-7 h-7" />
					<span className="font-bold text-[18px] text-center whitespace-pre-line">
						과거의 날짜는 예약할 수 없습니다.
					</span>
				</div>
				<div className="flex items-center justify-center w-full">
					<ButtonActive
						btnTxt="확인"
						isConfirm={true}
						clickBtn={() => setIsAlertModal()}
					/>
				</div>
			</div>
		</div>
	);
};

