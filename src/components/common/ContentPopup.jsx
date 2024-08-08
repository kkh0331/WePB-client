import React from 'react';

export default function ContentPopup({ content, setIsContentPopup }) {
	return (
		<div className="absolute flex items-center justify-center w-screen h-screen transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
			<div className="absolute w-full h-full opacity-70 bg-sh-gr-01"></div>
			<div className="relative z-50 w-full p-3 mx-5 bg-white rounded-lg shadow-lg animate-slide-down">
				<div className="flex items-center justify-between">
					<p className="px-2 font-bold">상세 내용</p>
					<p className="px-2" onClick={setIsContentPopup}>
						X
					</p>
				</div>
				<p className="px-2 mt-4 text-[15px]">
					{content ? content : '내용이 없습니다.'}
				</p>
			</div>
		</div>
	);
}
