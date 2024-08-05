import React from 'react'

export default function ContentPopup({content, setIsContentPopup}) {
  return (
    <div className='w-screen h-screen absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
      <div className='opacity-70 bg-sh-gr-01 w-full h-full absolute'></div>
      <div className='z-50 bg-white w-full relative mx-5 shadow-lg p-2 rounded-lg'>
        <div className='flex justify-between items-center'>
          <p className='font-bold'>[상담 요청 사항]</p>
          <p className='mr-1' onClick={setIsContentPopup}>X</p>
        </div>
        <p className='mt-4'>{content}</p>
      </div>
    </div>
  )
}
