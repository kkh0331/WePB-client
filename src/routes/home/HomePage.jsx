import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// modal sheet
import { Sheet } from 'react-modal-sheet';

// assets
import search from '../../assets/search.svg';

// components
import PBInfoComponent from '../../components/PBInfo/PBInfoComponent';
import PBCardListComponent from '../../components/Home/PBCardListComponent';
import ButtonActive from '../../components/button/ButtonActive';
import Loading from '../../components/common/Loading';

// apis
import { getPBList, getPBListByCategory } from '../../libs/apis/pb';

export default function HomePage() {
	const navigate = useNavigate();
	const [isModal, setIsModal] = useState(false);
	const [isSelected, setIsSelected] = useState(-1);
	const [pbList, setPbList] = useState([]);
	const [selectedPB, setSelectedPB] = useState(-1);
	const [isLoading, setIsLoading] = useState(true);
	const [isDistance, setIsDistance] = useState(false);
	const fetchPBList = async () => {
		try {
			const data = await getPBList();
			setPbList(data.response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchPBListByCategory = async () => {
		try {
			const data = await getPBListByCategory(isSelected, isDistance);
			setPbList(data.response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPBList();
	}, []);

	useEffect(() => {
		setIsLoading(true);
		if (isSelected === -1) fetchPBList();
		else fetchPBListByCategory();
	}, [isSelected, isDistance]);
	return (
		<div>
			<div className="flex items-center justify-between w-full h-16 px-5 font-bold">
				WeePB
				<button onClick={() => navigate('/login')}>로그인</button>
			</div>
			<div className="w-full px-5 pb-28 bg-sh-gr-01">
				{/* <div className="flex items-center py-2">
			<div className="w-full h-16 px-5 pb-28 bg-sh-gr-01">
				<div className="flex items-center py-2">
					<img src={search} className="mr-2 w-7 h-7" />
					<span>카테고리별로 PB 정보를 확인할 수 있어요!</span>
				</div> */}
				<div className="flex gap-3 py-4 overflow-x-scroll">
					<button
						onClick={() => setIsSelected(-1)}
						className={`flex-shrink-0 px-6 py-1 rounded-[50px] font-bold text-[15px] ${isSelected === -1 ? 'text-white bg-[#0046FF]' : 'text-black bg-[#ECECEC]'}`}
					>
						전체
					</button>
					<button
						onClick={() => setIsSelected(0)}
						className={`flex-shrink-0 px-6 py-1 rounded-[50px] font-bold text-[15px] ${isSelected === 0 ? 'text-white bg-[#0046FF]' : 'text-black bg-[#ECECEC]'}`}
					>
						증권
					</button>
					<button
						onClick={() => setIsSelected(1)}
						className={`flex-shrink-0 px-6 py-1 rounded-[50px] font-bold text-[15px] ${isSelected === 1 ? 'text-white bg-[#0046FF]' : 'text-black bg-[#ECECEC]'}`}
					>
						연금
					</button>
					<button
						onClick={() => setIsSelected(2)}
						className={`flex-shrink-0 px-6 py-1 rounded-[50px] font-bold text-[15px] ${isSelected === 2 ? 'text-white bg-[#0046FF]' : 'text-black bg-[#ECECEC]'}`}
					>
						채권
					</button>
					<button
						onClick={() => setIsSelected(3)}
						className={`flex-shrink-0 px-6 py-1 rounded-[50px] font-bold text-[15px] ${isSelected === 3 ? 'text-white bg-[#0046FF]' : 'text-black bg-[#ECECEC]'}`}
					>
						파생
					</button>
				</div>
				<div className="flex justify-end my-2">
					<label class="inline-flex items-center">
						<span class="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300">
							거리순
						</span>
						<input
							type="checkbox"
							onChange={() => setIsDistance(!isDistance)}
							value={isDistance}
							class="sr-only peer"
						/>
						<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
					</label>
				</div>
				<div className="flex flex-col items-center w-full gap-5 my-2"></div>
				<div className="h-[calc(100vh-245px)] overflow-y-scroll bg-sh-gr-01">
					<div className="flex flex-col items-center gap-5 my-2">
						{isLoading ? (
							<Loading />
						) : (
							pbList.map((elem, index) => (
								<PBCardListComponent
									key={index}
									setIsModal={setIsModal}
									data={elem}
									setSelectedPB={setSelectedPB}
								/>
							))
						)}
					</div>
				</div>
				<SlideUpDownModal
					setIsModal={setIsModal}
					isModal={isModal}
					selectedPB={selectedPB}
				/>
			</div>
		</div>
	);
}

const SlideUpDownModal = ({ setIsModal, isModal, selectedPB }) => {
	return (
		<Sheet
			isOpen={isModal}
			onClose={() => setIsModal(false)}
			detent="content-height"
		>
			<Sheet.Container>
				<Sheet.Header />
				<Sheet.Content className="py-10 overflow-y-scroll">
					<PBInfoComponent id={selectedPB} />
				</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</Sheet>
	);
};
