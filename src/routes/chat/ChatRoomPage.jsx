import React from 'react';
import { useNavigate } from 'react-router-dom';

// assets
import consulting from '../../assets/consulting.png';
import arrowUp from '../../assets/arrow-up.svg';
import back from '../../assets/cheveron-left.svg';

export default function ChatRoomPage() {
	const navigate = useNavigate();
	return (
		<>
			<div className="flex items-center justify-center h-16 p-5 font-bold">
				<img
					src={back}
					className="absolute left-0 w-8 h-8 ml-5"
					onClick={() => navigate(-1)}
				/>
				<span>채팅</span>
			</div>
			<ChatPartnerInfo />
			<div className="grid w-full px-5 mt-6">
				<ChatSenderComponent />
				<ChatReceiverComponent />
			</div>
			<ChatInputComponent />
		</>
	);
}

const ChatPartnerInfo = () => {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-between px-5">
			<div className="flex">
				<div className="w-12 h-12 bg-gray-300 rounded-full" />
				<div className="flex flex-col justify-center mx-4">
					<span className="text-[18px] font-bold">권기현 팀장</span>
					<span className="text-[13px]">머시기저시기 담당</span>
				</div>
			</div>
			<button
				className="flex flex-col items-center justify-center"
				onClick={() => navigate('../reservation')}
			>
				<img src={consulting} className="w-5" />
				<span className="text-[12px] mt-1">상담 신청하기</span>
			</button>
		</div>
	);
};

const ChatSenderComponent = () => {
	return (
		<div className="flex justify-self-end">
			<span className="text-[12px] text-[#8F8F8F] mb-2 mr-2 flex items-end">
				18:22
			</span>
			<div className="px-5 py-2 bg-[#D8E2FF] w-fit rounded-[10px] my-2">
				<span className="text-[17px]">안녕하세요~</span>
			</div>
		</div>
	);
};

const ChatReceiverComponent = () => {
	return (
		<div className="flex flex-end">
			<div className="px-5 py-2 bg-[#F1F1F1] w-fit rounded-[10px] my-2">
				<span className="text-[17px]">안녕하세요~ 늦게 답장 지송~</span>
			</div>
			<span className="text-[12px] text-[#8F8F8F] mb-2 ml-2 flex items-end">
				18:22
			</span>
		</div>
	);
};

const ChatInputComponent = () => {
	return (
		<div className="fixed bottom-0 flex items-center justify-center w-full mb-20">
			<div className="border-2 rounded-[20px] py-2 px-3 w-11/12 flex justify-between">
				<input className="flex-1 ml-2 mr-4 bg-white" />
				<button className="bg-[#0046FF] p-[6px] rounded-full">
					<img src={arrowUp} />
				</button>
			</div>
		</div>
	);
};
