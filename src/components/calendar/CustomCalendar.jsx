import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

// value : 캘린더 상으로 선택된 날짜
// onChange : 날짜 변경되는 수식
// 필요한 곳에서 아래 코드를 정의해서 
// const [value, onChange] = useState(new Date());
// <Calendar value={value} onChange={onChange}/>
export default function CustomCalendar({value, onChange}) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    // TODO DB에서 날짜 데이터 받아오기
    // '202408'을 request -> 해당 월의 약속이 잡혀 있는 날을 response
    setDays(['20240801', '20240806', '20240803', '20240804']);
  }, [])

	return (
		<Calendar
			locale="en"
			calendarType="gregory"
			value={value}
			onChange={onChange} //useState로 날짜 포커스 변경 시 그 날짜 받아오기
			minDetail="month"
			maxDetail="month"
			formatDay={(local, date) => moment(date).format('DD')}
			showNeighboringMonth={false}
			className="mx-auto w-full text-sm shadow"
			tileContent={({ date, view }) => {
				if (days.find(x => x === moment(date).format('YYYYMMDD'))) {
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
	);
}
