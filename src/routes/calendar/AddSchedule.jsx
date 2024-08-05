import React, { useEffect, useState } from 'react';
import EnableTime from '../../components/calendar/EnableTime';
import ButtonDouble from '../../components/button/ButtonDouble';

export default function AddSchedule({isAddSchedule, setIsAddSchedule}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [selectedTime, setSelectedTime] = useState("");

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
    console.log("취소")
  }

  const clickAddBtn = () => {
    //TODO 데이터 보내기
    setIsAddSchedule();
    console.log("추가")
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
        <EnableTime selectedTime={selectedTime} setSelectedTime={(time) => setSelectedTime(time)}/>
        <ButtonDouble btnCancelTxt={"닫기"} btnConfirmTxt={"추가"} clickCancelBtn={clickCancelBtn} clickConfirmBtn={clickAddBtn}/>
      </div>
		</div>
	);
}
