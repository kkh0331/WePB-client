import React, { useState } from 'react';
import ChatSvg from '@/assets/svg/chat-text.svg';
import ContentSvg from '@/assets/svg/card-text.svg';
import ContentPopup from '../../components/common/ContentPopup';
import { createRoom } from '../../libs/apis/chat';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Schedule({ dayTime, name, description, place, pbId }) {
  const [isContent, setIsContent] = useState(false);
  const { id, role } = useSelector(state => state.user);
  const navigate = useNavigate();

  const clickContent = () => {
    setIsContent(!isContent)
  }

  const clickCreateRoom = async () => {
		try{
			const response = await createRoom(id, pbId, role);
			console.log(response);
			if(response.status === 200){
				// enterRoom
				navigate(`../chat/${pbId}chat${id}`)
			}
		}catch(error){
			console.log(error);
		} 
	}

	return (
		<div className='mt-2 bg-white p-1 h-16 rounded-lg text-base flex px-2 shadow'>
      <div className='flex items-center w-1/5'>
        {dayTime} 
      </div>
      <div className='w-3/5 flex flex-col justify-center'>
        <p className='font-bold text-lg'>{name}</p>
        <p className='font-normal text-gray-400 text-sm'>{place}</p>
      </div>
      <div className='w-1/5 flex justify-end items-center pr-1'>
        <img src={ContentSvg} onClick={clickContent} className='mr-2 w-5 h-5'/>
        {isContent ? <ContentPopup content={description} setIsContentPopup={() => setIsContent(!isContent)}/> : <></>}
        <img src={ChatSvg} onClick={() => clickCreateRoom(pbId)}/>
      </div>
		</div>
	);
}