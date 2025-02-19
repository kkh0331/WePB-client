import React from 'react';

// assets
import paperClip from '../../assets/link.svg';
import emailLink from '../../assets/at-symbol.svg';
import profile from '../../assets/profile.svg';

// apis
import { getPBInfo } from '../../libs/apis/pb';
import { useState } from 'react';
import { useEffect } from 'react';

// components
import ButtonActive from '../button/ButtonActive';
import { useSelector } from 'react-redux';
import { createRoom } from '../../libs/apis/chat';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';

export default function PBInfoComponent({ pbId }) {
	const { id, role } = useSelector(state => state.user);
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const fetchPBInfo = async () => {
		try {
			const response = await getPBInfo(pbId);
			setData(response.response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const type = {
		안정형: 'rgba(179, 220, 235, 0.8)',
		안정추구형: 'rgba(186, 200, 248, 0.8)',
		위험중립형: 'rgba(249, 231, 203, 0.8)',
		적극투자형: 'rgba(252, 205, 187, 0.8)',
		공격투자형: 'rgba(255, 175, 169, 0.8)',
	};

	useEffect(() => {
		fetchPBInfo();
	}, []);

	const clickCreateRoom = async () => {
		try {
			const response = await createRoom(id, pbId, role);
			console.log(response);
			if (response.status === 200) {
				// enterRoom
				navigate(`../chat/${pbId}chat${id}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{isLoading ? (
				<div className="flex items-center justify-center h-[500px]">
					<div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
				</div>
			) : (
				<div className="h-[80vh] overflow-y-scroll">
					<div className="flex items-center justify-center w-full gap-5">
						<div className="flex items-center justify-center w-full gap-5 flex-shirink-0">
							<img
								src={data.pbUser.photo || profile}
								onError={e => {
									e.target.src = profile;
								}}
								className="flex items-center justify-center w-24 h-24 rounded-full"
							/>
							<div className="flex flex-col items-left">
								<div className="relative flex justify-center h-full ml-3 w-fit">
									<div
										className="box-content absolute bottom-[1px] w-full h-[10px] px-1 z-1"
										style={{
											backgroundColor: `${type[data.pbUser.invest_type]}`,
										}}
									/>
									<span className="text-[14px] font-medium z-10">
										{data.pbUser.invest_type}
									</span>
								</div>
								<div className="flex items-baseline gap-2 pl-2">
									<span className="text-[24px] font-bold">
										{data.pbUser.name} PB
									</span>
									<span className="text-[15px] text-[#505050]">
										{data.pbUser.category}
									</span>
								</div>
								<span className="text-[16px] pl-2">
									{data.pbUser.category_detail}
								</span>
								<div className="ml-2 flex items-center gap-[1px]">
									<img src={emailLink} className="w-4 h-4" />
									<span className="text-[13px]">{data.pbUser.email}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col w-full gap-5 p-5 mt-3 mb-8">
						{data.pbUser.pr ? (
							<div className="border-[1px] rounded-[10px] w-full p-5 text-[16px]">
								{data.pbUser.pr}
							</div>
						) : null}
						<ul className="flex gap-5 w-full border-b-[1px] pb-5">
							<span className="font-bold text-[16px] flex-1">경력</span>
							<div className="flex flex-col w-9/12">
								{data.portpolios.map((elem, index) => (
									<li
										className="text-[16px] flex items-baseline gap-2"
										key={index}
									>
										<span className="font-semibold">{elem.company}</span>
										<span className="text-[12px] text-[#474759]">
											({elem.start_date.slice(0, 4)}~{elem.end_date.slice(0, 4)}
											)
										</span>
									</li>
								))}
							</div>
						</ul>
						<ul className="flex gap-5 w-full border-b-[1px] pb-5">
							<span className="font-bold text-[16px] flex-1">대외평가</span>
							<div className="flex flex-col w-9/12">
								{data.awards?.length > 0 ? (
									data.awards.map((elem, index) => (
										<li
											className="text-[16px] w-full flex flex-col"
											key={elem.id}
										>
											<span className="text-[13px] text-[#474759]">
												{elem.awards_date.slice(0, 7)}
											</span>
											<span className="w-full font-semibold break-words">
												{elem.awards_title}
											</span>
										</li>
									))
								) : (
									<span>해당 항목이 없습니다.</span>
								)}
							</div>
						</ul>
						<ul className="flex gap-5w-full border-b-[1px] pb-5">
							<span className="font-bold text-[16px] flex-1">자격증</span>
							<div className="flex flex-col w-9/12">
								{data.pbUser.certificate ? (
									data.pbUser.certificate.split(',').map((elem, index) => (
										<li
											className="text-[16px] truncate flex flex-col"
											key={index}
										>
											<span className="text-[16px]">{elem}</span>
										</li>
									))
								) : (
									<span>해당 항목이 없습니다.</span>
								)}
							</div>
						</ul>
						<ul className="flex w-full gap-5">
							<span className="font-bold text-[16px] flex-1">지점 정보</span>
							<div className="flex flex-col w-9/12">
								<li className="text-[16px]">
									{data.office.name} ({data.office.region})
								</li>
								<li className="text-[14px] text-[#707070]">
									{data.office.address}
								</li>
							</div>
						</ul>
						<div className="my-1">
							<MapComponent
								lat={data.office.latitude}
								lng={data.office.longitude}
								lastPartAddress={data.office.address}
							/>
						</div>
					</div>
					{role === 0 ? (
						<></>
					) : (
						<div className="fixed bottom-0 z-20 flex justify-center w-full py-3 bg-white">
							<div className="flex w-5/12">
								<ButtonActive
									btnTxt="채팅하기"
									isConfirm={true}
									clickBtn={clickCreateRoom}
								/>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
