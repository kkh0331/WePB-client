import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

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
import { getPBList } from '../../libs/apis/pb';

export default function HomePage() {
	const [isModal, setIsModal] = useState(false);
	const [isSelected, setIsSelected] = useState(0);
	const [pbList, setPbList] = useState([]);
	const [selectedPB, setSelectedPB] = useState(-1);
	const [isLoading, setIsLoading] = useState(true);
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

	useEffect(() => {
		fetchPBList();
	}, []);
	return (
		<div>
			<div className="flex items-center w-full h-16 px-5 font-bold">WeePB</div>
			<div className="w-full h-16 px-5 pb-28 bg-sh-gr-01">
				<div className="flex items-center py-2">
					<img src={search} className="mr-2 w-7 h-7" />
					<span>카테고리별로 PB 정보를 확인할 수 있어요!</span>
				</div>
				<div className="flex gap-3 py-4 overflow-x-scroll">
					<button
						onClick={() => setIsSelected(0)}
						className={`flex-shrink-0 px-6 py-1 rounded-[50px] font-bold text-[15px] ${isSelected === 0 ? 'text-white bg-[#0046FF]' : 'text-black bg-[#ECECEC]'}`}
					>
						상품 1
					</button>
					<button
						onClick={() => setIsSelected(1)}
						className={`flex-shrink-0 px-6 py-1 rounded-[50px] font-bold text-[15px] ${isSelected === 1 ? 'text-white bg-[#0046FF]' : 'text-black bg-[#ECECEC]'}`}
					>
						상품 1
					</button>
					<button
						onClick={() => setIsSelected(2)}
						className={`flex-shrink-0 px-6 py-1 rounded-[50px] font-bold text-[15px] ${isSelected === 2 ? 'text-white bg-[#0046FF]' : 'text-black bg-[#ECECEC]'}`}
					>
						상품 1
					</button>
					<button
						onClick={() => setIsSelected(3)}
						className={`flex-shrink-0 px-6 py-1 rounded-[50px] font-bold text-[15px] ${isSelected === 3 ? 'text-white bg-[#0046FF]' : 'text-black bg-[#ECECEC]'}`}
					>
						상품 1
					</button>
					<button
						onClick={() => setIsSelected(4)}
						className={`flex-shrink-0 px-6 py-1 rounded-[50px] font-bold text-[15px] ${isSelected === 4 ? 'text-white bg-[#0046FF]' : 'text-black bg-[#ECECEC]'}`}
					>
						상품 1
					</button>
				</div>
			</div>
			<div className='h-[calc(100vh-245px)] overflow-y-scroll bg-sh-gr-01'>
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
