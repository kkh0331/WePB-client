import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeYYYYMMDD, getYM } from '../../utils/time';
import '@/assets/css/Calendar.css';
import moment from 'moment';
import Schedule from './Schedule';
import AddSchedule from './AddSchedule';
import CustomCalendar from '../../components/calendar/CustomCalendar';
import { getTodaySchedules } from '../../libs/apis/calendar';

export default function CalendarPage() {
	const { id, role } = useSelector(state => state.user);
	const [schedules, setSchedules] = useState([]);
	const [value, onChange] = useState(new Date());
	const [isAddSchedule, setIsAddSchedule] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchTodaySchedules();
	}, [value]);

	const fetchTodaySchedules = async() => {
		const today = moment(value).format("YYYY-MM-DD")
		try{
			const response = await getTodaySchedules(id, today, role);
			setSchedules(response.response);
		} catch(error){
			console.log(error);
			setSchedules([]);
		} finally {
			setIsLoading(false);
		}
	}

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
							key={schedule.dayTime}
							dayTime={moment(schedule.dayTime).format("HH:mm")}
							name={schedule.scheduleName}
							place={schedule.schedulePlace}
							description={schedule.scheduleDescription}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
