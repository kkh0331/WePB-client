import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditSvg from '@/assets/svg/edit.svg';
import moment from 'moment';
import GroupDocument from '../../components/my/GroupDocument';

export default function MyPage() {
	const {name, role} = useSelector(state => state.user);
	const [documents, setDocuments] = useState({});
	const [keys, setKeys] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		try {
			// role에 따라서 api 따로 보내야 함.
			const processedDocuments = [
				{
					name: '테스트',
					content: '"빅파이01는 왜 빅파이인가요?"',
					reservationDate: '2024-08-05T08:54:21Z',
				},
				{
					name: '테스트',
					content: '"빅파이02는 왜 빅파이인가요?"',
					reservationDate: '2024-08-06T08:54:21Z',
				},
				{
					name: '테스트',
					content: '"빅파이03는 왜 빅파이인가요?"',
					reservationDate: '2024-08-07T08:54:21Z',
				},
				{
					name: '테스트',
					content: '"빅파이04는 왜 빅파이인가요?"',
					reservationDate: '2024-08-05T09:54:21Z',
				},
				{
					name: '테스트',
					content: '"빅파이05는 왜 빅파이인가요?"',
					reservationDate: '2024-08-05T11:54:21Z',
				},
				{
					name: '테스트',
					content: '"빅파이06는 왜 빅파이인가요?"',
					reservationDate: '2024-08-06T08:00:21Z',
				},
			]
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

			setDocuments(processedDocuments);
			const extractKeys = Object.keys(processedDocuments).reverse();
			setKeys(extractKeys);
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
		<div className="bg-sh-gr-01 h-screen">
			{isLoading ? (
				<div className="flex items-center justify-center h-full">
					<div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
				</div>
			) : (
				<>
					<div className="w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-xl font-sans font-bold flex justify-center items-center relative shadow">
						<div>마이페이지</div>
					</div>
					<div className="flex items-center justify-start w-full p-5 relative">
						<div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full" />
						<div className="flex flex-col items-left ml-5">
							<div className="flex items-baseline gap-2 pl-2">
								<span className="text-[24px] font-bold">
									<span className="text-blue-700">
										{name} {role === 0 ? 'PB' : '고객'}
									</span>
									님,
								</span>
							</div>
							<span className="text-[18px] my-1 pl-2">
								항상 화이팅하세요~~!!
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
						<div>
							{role == 0
								? '☑️ 고객분들의 상담내용을 확인할 수 있어요'
								: '☑️ 요청하신 상담내용을 확인할 수 있어요'}
						</div>
						{keys.map(key => {
							return <GroupDocument key={key} documents={documents[key]} />;
						})}
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

