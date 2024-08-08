import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

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
import { useSelector } from 'react-redux';

export default function HomePage() {
	const navigate = useNavigate();
	const [isModal, setIsModal] = useState(false);
	const [isSelected, setIsSelected] = useState(-1);
	const [pbList, setPbList] = useState([]);
	const [selectedPB, setSelectedPB] = useState(-1);
	const [isLoading, setIsLoading] = useState(true);
	const [isDistance, setIsDistance] = useState(false);
	const [page, setPage] = useState(0);
	const [ref, inView] = useInView();
	const { id, name } = useSelector(state => state.user);

	const fetchPBList = async (isDistance, page) => {
		try {
			const data = await getPBList(isDistance, page);
			if (page === 0) setPbList([...data.response.content]);
			else setPbList([...pbList, ...data.response.content]);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchPBListByCategory = async (isDistance, page) => {
		try {
			const data = await getPBListByCategory(isSelected, isDistance, page);
			if (page === 0) setPbList([...data.response.content]);
			else setPbList([...pbList, ...data.response.content]);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPBList(isDistance, 0);
	}, []);

	useEffect(() => {
		if (inView) {
			if (page < 25) {
				if (isSelected === -1) fetchPBList(isDistance, page);
				else fetchPBListByCategory(isDistance, page);
				setPage(page + 1);
			}
		}
	}, [inView]);

	useEffect(() => {
		setPbList([]);
		setIsLoading(true);
		setPage(0);
		if (isSelected === -1) fetchPBList(isDistance, 0);
		else fetchPBListByCategory(isDistance, 0);
	}, [isSelected, isDistance]);

	return (
		<div>
			<div className="relative flex items-center justify-between w-full h-16 px-5 font-sans text-xl font-bold bg-white border-t border-b border-gray-200 shadow">
				SolPB
				{id !== '' ? (
					<span>{name}</span>
				) : (
					<button onClick={() => navigate('/login')}>로그인</button>
				)}
			</div>
			<div className="w-full px-5 overflow-y-hidden bg-white">
				<div className="flex items-center justify-between w-full py-4">
					<span
						className={`flex-1 pb-1 flex items-center justify-center ${isSelected === -1 ? 'text-[18px] font-bold border-b-[3px] text-[#002DAA] border-[#002DAA]' : 'text-[15px]'} transition-transform duration-80 ease-in-out transform active:translate-y-1`}
						onClick={() => setIsSelected(-1)}
					>
						전체
					</span>
					<span
						className={`flex-1 pb-1 flex items-center justify-center ${isSelected === 0 ? 'text-[18px] font-bold border-b-[3px] text-[#002DAA] border-[#002DAA]' : 'text-[15px]'} transition-transform duration-80 ease-in-out transform active:translate-y-1`}
						onClick={() => setIsSelected(0)}
					>
						증권
					</span>
					<span
						className={`flex-1 pb-1 flex items-center  justify-center ${isSelected === 1 ? 'text-[18px] font-bold border-b-[3px] text-[#002DAA] border-[#002DAA]' : 'text-[15px]'} transition-transform duration-80 ease-in-out transform active:translate-y-1`}
						onClick={() => setIsSelected(1)}
					>
						연금
					</span>
					<span
						className={`flex-1 pb-1 flex items-center  justify-center ${isSelected === 2 ? 'text-[18px] font-bold border-b-[3px] text-[#002DAA] border-[#002DAA]' : 'text-[15px]'} transition-transform duration-80 ease-in-out transform active:translate-y-1`}
						onClick={() => setIsSelected(2)}
					>
						채권
					</span>
					<span
						className={`flex-1 pb-1 flex items-center  justify-center ${isSelected === 3 ? 'text-[18px] font-bold border-b-[3px] text-[#002DAA] border-[#002DAA]' : 'text-[15px]'} transition-transform duration-80 ease-in-out transform active:translate-y-1`}
						onClick={() => setIsSelected(3)}
					>
						파생
					</span>
				</div>
				<div className="flex justify-end">
					<label className="inline-flex items-center">
						<span className="mx-2 text-sm font-medium text-[#545454]">
							거리순
						</span>
						<input
							type="checkbox"
							onChange={() => setIsDistance(!isDistance)}
							value={isDistance}
							className="sr-only peer"
						/>
						<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#002DAA]"></div>
					</label>
				</div>
				<div className="h-[calc(100vh-218px)] py-2 overflow-y-scroll">
					<div className="flex flex-col items-center gap-5 my-2">
						{isLoading ? (
							<Loading />
						) : (
							pbList?.map((elem, index) => (
								<PBCardListComponent
									key={index}
									setIsModal={setIsModal}
									data={elem}
									setSelectedPB={setSelectedPB}
								/>
							))
						)}
					</div>
					<div className="h-1" ref={ref} />
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
				<Sheet.Content className="pt-5 pb-10 overflow-y-scroll">
					<PBInfoComponent pbId={selectedPB} />
				</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</Sheet>
	);
};
