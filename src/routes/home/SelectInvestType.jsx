import React, { useState } from 'react'
import ButtonActive from '../../components/button/ButtonActive';

export default function SelectInvestType({clickType, selectedType}) {
  const [type, setType] = useState(selectedType); 
  
  const clickBtn = () => {
    setType(0);
    clickType(type);
  }

  return (
    <div className="absolute z-10 flex items-center justify-center w-screen h-screen">
			<div className="absolute w-full h-full bg-gray-300 opacity-50 z-11" />
			<div className="fixed shadow-md bg-white rounded-2xl z-20 p-5 flex flex-col items-center gap-5 animate-slide-down">
				<div className="flex justify-start gap-1 w-full">
					<span className="font-bold text-xl text-center whitespace-pre-line">
						투자형
					</span>
				</div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between gap-4 w-full px-2'>
            <InvestType value={0} name={"전체"} setType={(value) => setType(value)} type={type}/> 
            <InvestType value={5} name={"공격투자형"} setType={(value) => setType(value)} type={type}/>
            <InvestType value={4} name={"적극투자형"} setType={(value) => setType(value)} type={type}/>
          </div>
          <div className='flex justify-center gap-4 w-full px-2'>
            <InvestType value={3} name={"위험중립형"} setType={(value) => setType(value)} type={type}/>
            <InvestType value={2} name={"안전추구형"} setType={(value) => setType(value)} type={type}/>
            <InvestType value={1} name={"안전형"} setType={(value) => setType(value)} type={type}/>
          </div>
        </div>
				<div className="flex items-evenly justify-center w-full">
					<ButtonActive
						btnTxt="확인"
						isConfirm={true}
						clickBtn={clickBtn}
					/>
				</div>
			</div>
		</div>
  );
}

const InvestType = ({ value, name, type, setType }) => {
  const customClass = () => {
    return value === type ? "bg-[#2a3fec] text-white" : ""
  }

	return (
		<div className={`border px-2 py-1 rounded-2xl ${customClass()}`} onClick={() => setType(value)}># {name}</div>
	);
};