import React from 'react';
import PleaseLogin from '@/assets/gif/please-login.gif';
import ButtonActive from '../button/ButtonActive';

export default function LoginErrorPage() {
	return (
    <div className='w-screen h-screen'>
      <div className="flex items-center justify-between w-full h-16 px-5 font-bold bg-white">
				SolPB
			</div>
      <div className="flex justify-start items-center w-screen h-screen flex-col">
        <img src={PleaseLogin} className="w-60 h-60 mt-40"/>
        <div className="w-3/5 flex justify-center items-center mt-10">
          <button
            className={`bg-[#2a3fec] text-xl text-white h-10 rounded-xl text-md font-semibold flex-grow`}
            onClick={() => clickBtn()}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
	);
}
