import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { getDays } from '../../libs/apis/calendar';
import { useSelector } from 'react-redux';
import Loading from '../common/Loading';

export default function CustomCalendar({ value, onChange }) {
	const { id, role } = useSelector(state => state.user);
	const [days, setDays] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [year, setYear] = useState(moment(value).format('YYYY'));
	const [month, setMonth] = useState(moment(value).format('MM'));

	useEffect(() => {
		fetchDays();
	}, [year, month]);

	const fetchDays = async () => {
		try {
			const response = await getDays(id, year, month, role);
			setDays(response.response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleOnActiveStartDateChange = ({ activeStartDate, view }) => {
		const newYear = moment(activeStartDate).format('YYYY');
		const newMonth = moment(activeStartDate).format('MM');
		setYear(newYear);
		setMonth(newMonth);
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<Calendar
					locale="en"
					calendarType="gregory"
					value={value}
					onChange={onChange} //useState로 날짜 포커스 변경 시 그 날짜 받아오기
					minDetail="month"
					maxDetail="month"
					next2Label={false}
					prev2Label={false}
					onActiveStartDateChange={handleOnActiveStartDateChange}
					formatDay={(local, date) => moment(date).format('DD')}
					showNeighboringMonth={false}
					className="mx-auto w-full text-sm shadow"
					tileContent={({ date, view }) => {
						if (days.find(x => x.date === moment(date).format('YYYY-MM-DD'))) {
							return (
								<>
									<div className="flex justify-center items-center absoluteDiv">
										<div className="dot"></div>
									</div>
								</>
							);
						}
					}}
				/>
			)}
		</>
	);
}
