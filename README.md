# WePB-Client
> 고객-PB간 일정 관리 및 채팅 서비스  
> `신한투자증권 인턴` 공통 프로젝트

## 🔗 Link
> https://github.com/shinhan-internship-project

## 📝 간단한 설명
1. 고객이 `PB의 정보와 전문성을 확인`하고
2. 메신저를 통해 간편하게 `상담을 예약`하며
3. `PB의 업무 효율성`을 높일 수 있는 웹 어플리케이션

## 🙋‍♂️ 담당한 기능
- 이번에는 `Front-end` 맡음
- Calendar Page 개발
- MyPage 개발
- 실시간 통신 연결을 통한 실시간 채팅 및 알람 서비스

## 📺 개발한 화면 구성
|캘린더 페이지|PB 개인 일정 추가|일정 상세 내용|
|:---:|:---:|:---:|
|<img width="202" alt="위피비캘린더" src="https://github.com/user-attachments/assets/265ce491-148b-4a29-acfe-f2383ac5aa97">|<img width="202" alt="위피비개인일정" src="https://github.com/user-attachments/assets/2dae80a2-4619-4e92-9a7a-d0023701e55d">|<img width="202" alt="위피비일정상세내용" src="https://github.com/user-attachments/assets/3d7a84c5-5ede-4a61-a736-17d28af6d8d7">|

|마이페이지|실시간 채팅 연결|알람 서비스|
|:---:|:---:|:---:|
|<img width="202" alt="위피비마이페이지" src="https://github.com/user-attachments/assets/b41a2b29-89ef-43e2-b426-0737c287c575">|<img width="202" alt="위피비실시간채팅" src="https://github.com/user-attachments/assets/75422ac4-1515-41ba-ad50-db4b2c6bf6f4">|<img width="202" alt="위피비알람" src="https://github.com/user-attachments/assets/25c74345-bb52-4edc-8f33-b78a02b3ef7e">|

## 🤔 잘 작성된 코드
`AddSchedule.jsx` `CalendarPage.jsx` `ConsultingReservationPage.jsx` `SignupPage.jsx`에서 공통으로 사용된 `AlertModal.jsx`을 컴포넌화하여 관리

```javascript
import React from 'react'
import check from '../../assets/check.svg';
import ButtonActive from '../button/ButtonActive';

export default function AlertModal({status, message, clickBtn}){
  return (
    <div className="absolute z-10 flex items-center justify-center w-screen h-screen">
      <div className="absolute w-full h-full bg-gray-300 opacity-50 z-11" />
      <div className="fixed shadow-md bg-white rounded-[30px] z-20 p-10 flex flex-col items-center gap-5 animate-slide-down">
        <div className="flex justify-center gap-1">
          <img src={check} className="w-7 h-7" />
          <span className="font-bold text-[18px] text-center whitespace-pre-line">
            {message(status)}
          </span>
        </div>
        <div className="flex items-center justify-center w-full">
          <ButtonActive
            btnTxt="확인"
            isConfirm={true}
            clickBtn={() => clickBtn(status)}
          />
        </div>
      </div>
    </div>
  )
}
```

## 😡 Trouble Issues
### Web Socket 연결을 통한 알람 메시지 구현
- 알람 기능을 위해서 connect()을 통해 `가장 최신 메시지의 시간을 store에 저장`하게 된다.
- 페이지에 따라서 알람 여부가 달라지기 때문에 `메시지를 받아올 때마다 pathname()을 검사`하게 된다.

[기존 코드]
```javascript
stompClient.current.connect({}, () => {
  stompClient.current.subscribe(`/sub/user/${id}`, message => {
    const newChatRooms = JSON.parse(message.body);
    newChatRooms.sort((a, b) => {
      return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
    });
    dispatch(setChatRooms(newChatRooms));
    if(newChatRooms.length > 0){
      const newLastMessage = newChatRooms[0];
      if(lastMessageTime === "" || lastMessageTime < newLastMessage.lastMessageTime){
        setName(newLastMessage.partnerName)
        if(newLastMessage.lastMessage === ''){
          setMessage('새로운 채팅방이 생성되었습니다.')
        } else {
          setMessage(newLastMessage.lastMessage)
        }
        dispatch(setLastMessageTime(newLastMessage.lastMessageTime))
        if(!pathname.startsWith('/chat')){
          setIsAlarmOpen(true);
        }
      }
    }
  });
});
```

[문제 상황]
- stompClient.current.subscribe로 전달된 콜백 함수는 `초기 렌더링 시에만 설정`
- setLastmessageTime()을 통해 store에 저장이 되어도 lastMessageTime은 초기 값으로 고정
- pathname 또한 같은 방식으로 초기 값으로 고정

[해결 방법]
- 이 문제를 해결하기 위해서 `useRef()을 사용` 
- useRef()을 사용하면 `리렌더링 없이도 값을 유지`할 수 있음 -> `상태관리`

[수정된 코드]
```javascript
stompClient.current.connect({}, () => {
  stompClient.current.subscribe(`/sub/user/${id}`, message => {
    const newChatRooms = JSON.parse(message.body);
    newChatRooms.sort((a, b) => {
      return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
    });
    dispatch(setChatRooms(newChatRooms));
    if(newChatRooms.length > 0){
      const newLastMessage = newChatRooms[0];
      if(lastMessageTimeRef.current === "" || lastMessageTimeRef.current < newLastMessage.lastMessageTime){
        setName(newLastMessage.partnerName)
        if(newLastMessage.lastMessage === ''){
          setMessage('새로운 채팅방이 생성되었습니다.')
        } else {
          setMessage(newLastMessage.lastMessage)
        }
        dispatch(setLastMessageTime(newLastMessage.lastMessageTime))
        if(!pathnameRef.current.startsWith('/chat')){
          setIsAlarmOpen(true);
        }
      }
    }
  });
});
```
