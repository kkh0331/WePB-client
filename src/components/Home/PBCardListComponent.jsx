import React from 'react';

// assets
import profile from '../../assets/profile.svg';

export default function PBCardListComponent({
	setIsModal,
	data,
	setSelectedPB,
}) {
	return (
		<div>
			<div className="w-[80vw] h-[20vh] rounded-[30px] shadow-lg flex items-center justify-center px-3 bg-white">
				<img
					src={data.photo || profile}
					onError={e => {
						e.target.src = profile;
					}}
					className="rounded-full w-28 h-28"
				/>
				<div className="flex flex-col ml-3">
					<div className="flex flex-row items-end gap-2">
						<span className="text-[20px] font-bold">{data.name} 팀장</span>
						<span className="text-[15px] text-[#505050]">8년차</span>
					</div>
					<span className="text-[15px]">머시기저시기 담당</span>
					<button
						className="btn bg-[#0046FF] font-bold text-white text-[17px] rounded-[10px] px-5 py-1 mt-3"
						onClick={() => {
							setIsModal(true);
							setSelectedPB(data.id);
						}}
					>
						자세히 보기
					</button>
				</div>
			</div>
		</div>
	);
}
