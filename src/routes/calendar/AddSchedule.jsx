import React, { useEffect, useState } from 'react';

export default function AddSchedule({isAddSchedule, setIsAddSchedule}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [selectedTime, setSelectedTime] = useState("");

  const times = [
    {"isEnable" : false, time : "10:00"},
    {"isEnable" : true, time : "11:30"},
    {"isEnable" : false, time : "13:30"},
    {"isEnable" : true, time : "14:30"},
    {"isEnable" : false, time : "15:30"},
    {"isEnable" : true, time : "16:20"},
    {"isEnable" : true, time : "17:00"},
    {"isEnable" : false, time : "18:00"}
  ]

  useEffect(() => {
    if(isAddSchedule){
      console.log("약속가능한 시간 받아오기")
    }
  }, [isAddSchedule])
  
  const clickCancelBtn = () => {
    setName("");
    setDescription("");
    setSelectedTime("");
    setIsAddSchedule();
  }

  const clickAddBtn = () => {
    //TODO 데이터 보내기
    setIsAddSchedule();
  }

  const timeClass = (time) => {
    if(!time.isEnable) return "border-gray-200 text-gray-200";
    if(selectedTime === time.time) return "text-white bg-blue-600"
    return "border-black"; 
  }

  const clickTime = (time) => {
    if(!time.isEnable) return;
    setSelectedTime(time.time);
  }

	return (
		<div
			className={`${isAddSchedule ? "flex" : "hidden"} fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full p-3`}
		>
			<div className='w-full bg-white p-3 rounded-xl'>
        <div className='w-full text-center text-2xl font-bold mb-3'>
          개별일정추가
        </div>
        <input 
          className='w-full border-gray-200 border rounded-lg h-9 px-2 my-1'
          placeholder='일정 내용'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          className='w-full border-gray-200 border rounded-lg h-9 px-2 my-1'
          placeholder='일정 세부사항'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-4 gap-2 my-3">
          {times.map(time => {
            return(
              <div key={time.time} className={`${timeClass(time)} rounded-lg border h-8 flex justify-center items-center`} onClick={() => clickTime(time)}>
                {time.time}
              </div>
            )
          })}
        </div>
        <div className='flex justify-between grow space-x-4 mt-1'>
          <button className='bg-gray-300 h-8 text-black rounded-lg font-bold text-lg flex-grow' onClick={clickCancelBtn}>취소</button>
          <button className='bg-blue-600 text-white h-8 rounded-lg font-bold text-lg flex-grow' onClick={clickAddBtn}>추가</button>
        </div>
      </div>
		</div>
	);
}
