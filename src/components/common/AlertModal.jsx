import React from 'react'
import check from '../../assets/check.svg';
import ButtonActive from '../button/ButtonActive';

export default function AlertModal({status, message, clickBtn}) {
  return (
    <div className="absolute z-10 flex items-center justify-center w-screen h-screen">
			<div className="absolute w-full h-full bg-gray-300 opacity-50 z-11" />
			<div className="fixed shadow-md bg-white rounded-[30px] z-20 p-10 flex flex-col items-center gap-5 animate-slide-down">
				<div className="flex justify-center gap-1">
					<img src={check} className="w-7 h-7" />
					<span className="font-bold text-[18px] text-center whitespace-pre-line">
						{message(status)}
					</span>
				</div>
				<div className="flex items-center justify-center w-full">
					<ButtonActive
						btnTxt="확인"
						isConfirm={true}
						clickBtn={() => clickBtn(status)}
					/>
				</div>
			</div>
		</div>
  )
}
