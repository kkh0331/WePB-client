import React from 'react';

// assets
import paperClip from '../../assets/link.svg';
import emailLink from '../../assets/at-symbol.svg';

export default function PBInfoComponent() {
	return (
		<div>
			<div className="flex items-center justify-center w-full gap-5">
				<div className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded-full" />
				<div className="flex flex-col items-left ">
					<div className="flex items-baseline gap-2 pl-2">
						<span className="text-[24px] font-bold">권기현 팀장</span>
						<span className="text-[15px] text-[#505050]">8년차</span>
					</div>
					<span className="text-[18px] my-1 pl-2">머시기저시기 담당</span>
					<div className="flex items-center gap-1">
						<img src={emailLink} className="w-4 h-4" />
						<span className="text-[13px]">rlgus@shinhan.com</span>
					</div>
					<div className="flex items-center gap-1">
						<img src={paperClip} className="w-4 h-4" />
						<span className="text-[13px]">https://www.naver.com</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full gap-3 p-5 mt-3">
				<ul class="flex gap-5 w-full">
					<span className="font-bold text-[16px] flex-1 text-right">학력</span>
					<div className="flex flex-col w-9/12">
						<li className="text-[16px]">성시경대학교</li>
						<li className="text-[16px]">경희대학교</li>
					</div>
				</ul>
				<ul class="flex gap-5 w-full">
					<span className="font-bold text-[16px] flex-1 text-right">경력</span>
					<div className="flex flex-col w-9/12">
						<li className="text-[16px]">성시경대학교</li>
						<li className="text-[16px]">경희대학교</li>
					</div>
				</ul>
				<ul class="flex gap-5 w-full">
					<span className="font-bold text-[16px] flex-1 text-right">
						대외평가
					</span>
					<div className="flex flex-col w-9/12">
						<li className="text-[16px] truncate">
							제 경력은요~~ 어쩌구저쩌구~~~~~~~~~~~~
						</li>
						<li className="text-[16px] truncate">
							제 경력은요~~ 어쩌구저쩌구~~~~~~~~~~~~~~
						</li>
					</div>
				</ul>
				<div className="border-2 rounded-[20px] w-full p-5 mt-5 text-[16px]">
					저는 최고의 PB! 맡겨주세요잉~~~~~~~~~~~~~~~~~~~~~~~~
				</div>
			</div>
		</div>
	);
}
