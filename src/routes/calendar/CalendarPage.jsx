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

	return (
		<div className="h-screen bg-white">
			<div
				className={`${isAddSchedule ? 'opacity-20' : ''} w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-xl font-sans font-bold flex justify-center items-center relative shadow`}
			>
				<div>일정</div>
				{role === 0 ? (
					<button
						className="absolute right-4"
						onClick={() => setIsAddSchedule(!isAddSchedule)}
					>
						+
					</button>
				) : null}
			</div>
			<AddSchedule
				id="default-modal"
				selectedDate={value}
				isAddSchedule={isAddSchedule}
				setIsAddSchedule={setIsAddSchedule}
			/>
			<div className={`p-3 ${isAddSchedule ? 'opacity-10' : ''}`}>
				<CustomCalendar value={value} onChange={onChange} />
			</div>

			<div className="flex-1 mt-2 mb-16">
				<p className="ml-3 px-1 font-black mt-2 mb-2">
					{moment(value).format('YYYY년 MM월 DD일')}
				</p>
				<div className='h-[32vh] ml-3 mr-3 overflow-y-scroll'>
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
