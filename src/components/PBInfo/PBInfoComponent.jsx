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
				<div>
					<div className="flex items-center justify-center w-full gap-5">
						<img
							src={data.pbUser.photo || profile}
							onError={e => {
								e.target.src = profile;
							}}
							className="flex items-center justify-center w-24 h-24 rounded-full"
						/>
						<div className="flex flex-col items-left ">
							<span className="ml-2 text-[15px] text-[#002DAA] font-bold">
								{data.pbUser.invest_type}
							</span>
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
							{data.pbUser.link ? (
								<div className="flex items-center gap-1 ml-2">
									<img src={paperClip} className="w-4 h-4" />
									<span className="text-[13px]">{data.pbUser.link}</span>
								</div>
							) : null}
						</div>
					</div>
					<div className="flex flex-col w-full gap-3 p-5 mt-3">
						<ul className="flex gap-5 w-full">
							<span className="font-bold text-[16px] flex-1 text-right">
								경력
							</span>
							<div className="flex flex-col w-9/12">
								{data.portpolios.map((elem, index) => (
									<li className="text-[16px] flex flex-col" key={index}>
										{elem.company}
										<span className="text-[12px]">
											({elem.start_date.slice(0, 10)}~
											{elem.end_date.slice(0, 10)})
										</span>
									</li>
								))}
							</div>
						</ul>
						<ul className="flex gap-5 w-full">
							<span className="font-bold text-[16px] flex-1 text-right">
								대외평가
							</span>
							<div className="flex flex-col w-9/12">
								{data.awards?.length > 0 ? (
									data.awards.map((elem, index) => (
										<li className="text-[16px] truncate flex flex-col">
											<span className="text-[13px]">
												{elem.awards_date.slice(0, 7)}
											</span>
											{elem.awards_title}
										</li>
									))
								) : (
									<span>해당 항목이 없습니다.</span>
								)}
							</div>
						</ul>
						<ul className="flex gap-5 w-full">
							<span className="font-bold text-[16px] flex-1 text-right">
								자격증
							</span>
							<div className="flex flex-col w-9/12">
								{data.pbUser.certificate ? (
									data.pbUser.certificate.split(',').map((elem, index) => (
										<li className="text-[16px] truncate flex flex-col">
											<span className="text-[16px]">{elem}</span>
										</li>
									))
								) : (
									<span>해당 항목이 없습니다.</span>
								)}
							</div>
						</ul>
						<ul className="flex gap-5 w-full">
							<span className="font-bold text-[16px] flex-1 text-right">
								지점 정보
							</span>
							<div className="flex flex-col w-9/12">
								<li className="text-[16px]">
									{data.office.name} ({data.office.region})
								</li>
								<li className="text-[14px] text-[#707070]">
									{data.office.address}
								</li>
							</div>
						</ul>
						<div className="border-2 rounded-[20px] w-full p-5 mt-5 text-[16px]">
							{data.pbUser.pr}
						</div>
					</div>
					{role === 0 ? (
						<></>
					) : (
						<div className="flex justify-center w-full">
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
