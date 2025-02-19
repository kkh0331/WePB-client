import moment from 'moment';
import React from 'react';

// partnerName는 내 메모인지 아닌지 여부 판단
export default function ContentPopup({
	dayTime,
	partnerName,
	content,
	setIsContentPopup,
	place,
}) {
	return (
		<div className="absolute flex items-center justify-center w-screen h-screen transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
			<div className="absolute w-full h-full bg-white opacity-50"></div>
			<div className="relative w-full p-3 mx-5 border rounded-lg shadow-lg z-100 bg-gray-50 animate-slide-down">
				<div className="flex items-center justify-between">
					<p className="font-bold">
						{partnerName ? '[상세 내용]' : '[개인 일정]'}
					</p>
					<p className="mr-1" onClick={setIsContentPopup}>
						X
					</p>
				</div>
				<div className="flex items-center gap-5 mt-4">
					<p className="flex items-center gap-1 break-words">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-3 h-3 font-black"
							fill="none"
							viewBox="0 0 240 240"
						>
							<path
								stroke="#000"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="16"
								d="m72.04 203.07-15.983 28.837M167.96 203.07l15.983 28.837M120 215.922c52.972 0 95.915-42.943 95.915-95.915 0-52.972-42.943-95.915-95.915-95.915-52.972 0-95.915 42.943-95.915 95.915 0 52.972 42.943 95.915 95.915 95.915Z"
							/>
							<path
								stroke="#000"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="16"
								d="M27.294 94.439A47.957 47.957 0 1 1 94.558 27.47M120 24.093V8.107m0 63.943v47.957m0 0 33.911 33.911m58.795-59.479a47.959 47.959 0 1 0-67.264-66.968"
							/>
						</svg>
						<span className="text-sm">{dayTime}</span>
					</p>
					<p className="flex items-center gap-1 break-words">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-3 h-3 font-black"
							fill="none"
							viewBox="0 0 36 36 "
						>
							<g clip-path="url(#a)">
								<path
									fill="#000"
									d="M31 8h-8v2h8v21h-8v2h10V10a2 2 0 0 0-2-2ZM19.88 3H6.12A2.12 2.12 0 0 0 4 5.12V33h18V5.12A2.12 2.12 0 0 0 19.88 3ZM20 31h-3v-3H9v3H6V5.12A.12.12 0 0 1 6.12 5h13.76a.12.12 0 0 1 .12.12V31Z"
								/>
								<path
									fill="#000"
									d="M8 8h2v2H8V8Zm4 0h2v2h-2V8Zm4 0h2v2h-2V8Zm-8 5h2v2H8v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-8 5h2v2H8v-2Zm8 0h2v2h-2v-2Zm-8 5h2v2H8v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Zm7-10h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-4 5h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-4 5h2v2h-2v-2Zm4 0h2v2h-2v-2Z"
								/>
							</g>
							<defs>
								<clipPath id="a">
									<path fill="#fff" d="M0 0h36v36H0z" />
								</clipPath>
							</defs>
						</svg>
						<span className="text-sm">{place || 'PB 회사'}</span>
					</p>
				</div>
				<p className="mt-2 break-words">
					{content ? content : '내용이 없습니다.'}
				</p>
			</div>
		</div>
	);
}
