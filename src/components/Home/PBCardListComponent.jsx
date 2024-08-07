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

	const type = {
		안정형: '#2A3FEC',
		안정추구형: '#5191FF',
		위험중립형: '#49CB1C',
		적극투자형: '#FF8A00',
		공격투자형: '#E11A1A',
	};

	return (
		<div>
			<div className="w-[82vw] h-[18vh] rounded-[30px] shadow-lg flex items-center justify-center px-3 bg-white">
				<img
					src={data.photo || profile}
					onError={e => {
						e.target.src = profile;
					}}
					className="w-20 h-20 rounded-full"
				/>
				<div className="flex flex-col flex-1 ml-3">
					<div className="flex flex-row items-center gap-1">
						{/* <div
							className={`w-3 h-3 rounded-full`}
							style={{ backgroundColor: `${type[data.invest_type]}` }}
						/> */}
						<span
							className={`text-[13px] text-[#545454] font-semibold px-3 rounded-[30px]`}
							style={{
								backgroundColor: `rgba(${parseInt(type[data.invest_type].slice(1, 3), 16)}, ${parseInt(type[data.invest_type].slice(3, 5), 16)}, ${parseInt(type[data.invest_type].slice(5, 7), 16)}, 0.2)`,
							}}
						>
							{data.invest_type}
						</span>
					</div>
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
