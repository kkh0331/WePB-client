import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSchedulesByYM } from '../../libs/apis/schedule';
import { changeYYYYMMDD, getYM } from '../../utils/time';
import '@/assets/css/Calendar.css';
import moment from 'moment';
import Schedule from './Schedule';
import AddSchedule from './AddSchedule';
import CustomCalendar from '../../components/calendar/CustomCalendar';
import { useFetcher } from 'react-router-dom';

export default function CalendarPage() {
	const { id, role } = useSelector(state => state.user);
	const [schedules, setSchedules] = useState([]);
	const [value, onChange] = useState(new Date());
	const [isAddSchedule, setIsAddSchedule] = useState(false);

	useEffect(() => {
		console.log(moment(value).format('YYYY-MM'));
	}, [value])

	useEffect(() => {
		// TODO 달력에 사용할 데이터를 가져온다.
		// 달력이 월 기준이므로 '202407'로 전송하면 사용자의 schedules 데이터를 가져온다.
		const ym = getYM();
		// const resSchedules = getSchedulesByYM(id, ym);
		const today = '09:00';
		const resSchedules = [
			{
				id: 1,
				partner: '홍길동',
				dayTime: today,
				scheduleName: '누구누구누구와 약속',
				scheduleDescription: '약속 세부사항~~~~~~',
			},
			{
				id: 2,
				partner: '홍길동',
				dayTime: today,
				scheduleName: '누구누구누구와 약속',
				scheduleDescription: '약속 세부사항~~~~~~',
			},
			{
				id: 3,
				partner: '홍길동',
				dayTime: today,
				scheduleName: '누구누구누구와 약속',
				scheduleDescription: '약속 세부사항~~~~~~',
			},
		];
		setSchedules(resSchedules);

	}, [value]);

	return (
		<div className="bg-sh-gr-01 h-screen">
			<div className={`${isAddSchedule ? "opacity-20" : ""} w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-xl font-sans font-bold flex justify-center items-center relative shadow`}>
				<div>일정</div>
				<button
					className="absolute right-4"
					onClick={() => setIsAddSchedule(!isAddSchedule)}
				>
					+
				</button>
			</div>
			<AddSchedule id="default-modal" isAddSchedule={isAddSchedule} setIsAddSchedule={setIsAddSchedule}/>
			<div className={`p-3 ${isAddSchedule ? "opacity-10" : ""}`}>
				<CustomCalendar value={value} onChange={onChange}/>
				<div className="mt-6">
					<p className="px-1 font-black">{moment(value).format('YYYY년 MM월 DD일')}</p>
					{[...schedules].map(schedule => (
						<Schedule
							key={schedule.id}
							dayTime={schedule.dayTime}
							name={schedule.scheduleName}
							description={schedule.scheduleDescription}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
