import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditSvg from '@/assets/svg/edit.svg';
import moment from 'moment';
import GroupDocument from '../../components/my/GroupDocument';
import { getRequestList } from '../../libs/apis/mypage';
import profile from '../../assets/profile.svg';
import check from '../../assets/clipboard-list.svg';
import smile from '../../assets/emoji-happy.svg';

export default function MyPage() {
	const { name, id, role } = useSelector(state => state.user);
	const [documents, setDocuments] = useState({});
	const [keys, setKeys] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchList = async () => {
		const data = await getRequestList(role === 0 ? 'pb' : 'customer', id);
		const processedData = await data.response
			.map(document => {
				return {
					...document,
					date: moment(document.reservationDate).format('YYYYMMDD'),
					time: moment(document.reservationDate).format('HHmm'),
				};
			})
			.reduce((newDocuments, document) => {
				const { date } = document;
				if (!newDocuments[date]) newDocuments[date] = [];
				newDocuments[date].push(document);
				return newDocuments;
			}, {});
		setDocuments(processedData);
		setKeys(Object.keys(processedData).reverse());
	};
	useEffect(() => {
		try {
			fetchList();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const clickEditBtn = () => {
		console.log('edit page 이동');
	};

	return (
		<div className={`min-h-screen h-full bg-white pb-20 flex flex-col`}>
			{isLoading ? (
				<div className="flex items-center justify-center h-full">
					<div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
				</div>
			) : (
				<>
					<div className="relative flex items-center justify-center w-full h-16 font-sans text-xl font-bold bg-white border-t border-gray-200 shadow">
						<div>마이페이지</div>
					</div>
					<div className="relative flex items-center justify-start w-full p-5">
						<img
							src={profile} // PB photo 추가해야함
							onError={e => {
								e.target.src = profile;
							}}
							className="flex items-center justify-center w-20 h-20 rounded-full"
						/>
						<div className="flex flex-col ml-5 items-left">
							<div className="flex items-baseline gap-2 pl-2">
								<span className="text-[24px] font-bold flex items-center">
									<div>
										<span className="mr-1 text-blue-700">{name}</span>
										<span className="text-[18px]">
											{role === 0 ? 'PB님' : '고객님'}
										</span>
									</div>
								</span>
							</div>
							<span className="text-[16px] my-1 pl-2 flex items-center">
								항상 화이팅하세요 ! <img src={smile} className="w-5 h-5 ml-1" />
							</span>
						</div>
						{role === 0 ? (
							<div className="absolute right-5" onClick={clickEditBtn}>
								<img src={EditSvg} />
							</div>
						) : (
							<></>
						)}
					</div>
					<div className="px-5">
						<div className="flex items-center">
							<img src={check} className="w-6 h-6 mr-1" />
							{role == 0
								? '고객분들의 상담내용을 확인할 수 있어요.'
								: '요청하신 상담내용을 확인할 수 있어요.'}
						</div>
						{keys?.length > 0 ? (
							keys.map(key => {
								return <GroupDocument key={key} documents={documents[key]} />;
							})
						) : (
							<div className="flex justify-center items-center flex-1">
								<span>{id==='' ? '로그인 후 진행해 주세요' : '해당 내역이 없습니다.'}</span>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}

// redux 테스트코드

/*
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/reducers/user';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const user = useSelector(state => state.user.user); 
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setError('로그인이 되어있지 않습니다.');
    } else {
      console.log(user);
    }
  }, [user]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <div>ID: {user?.id}</div>
          <div>Name: {user?.name}</div>
          <div>Role: {user?.role}</div>
          // API 까보니까 ID/NAME/ROLE 이렇게 3개 와서 테스트용으로 표시해둠
          <button onClick={handleLogout}>로그아웃</button>
        </>
      )}
    </div>
  );
}

  */
