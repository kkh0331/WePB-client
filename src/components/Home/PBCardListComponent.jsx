import React from 'react';

// assets
import profile from '../../assets/profile.svg';

// components
import ButtonActive from '../../components/button/ButtonActive';

export default function PBCardListComponent({
	setIsModal,
	data,
	setSelectedPB,
}) {
	const clickDetailBtn = () => {
		setIsModal(true);
		setSelectedPB(data.id);
	};
	return (
		<div>
			<div className="w-[78vw] h-[18vh] rounded-[30px] shadow-lg flex items-center justify-center px-3 bg-white">
				<img
					src={data.photo || profile}
					onError={e => {
						e.target.src = profile;
					}}
					className="w-24 h-24 rounded-full"
				/>
				<div className="flex flex-col flex-1 ml-3">
					<div className="flex flex-row items-baseline gap-2">
						<span className="text-[20px] font-bold">{data.name} PB</span>
						<span className="text-[12px] text-[#505050]">
							{data.category_detail}
						</span>
					</div>
					<span className="text-[15px]">{data.office_name}</span>
					<div className="flex w-full mt-2">
						<ButtonActive
							btnTxt="자세히 보기"
							isConfirm={true}
							clickBtn={clickDetailBtn}
						/>
					</div>
					{/* <button
						className="btn bg-[#0046FF] font-bold text-white text-[15px] rounded-[10px] mt-3"
						onClick={() => {
							setIsModal(true);
							setSelectedPB(data.id);
						}}
					>
						자세히 보기
					</button> */}
				</div>
			</div>
		</div>
	);
}
