import React, { useMemo } from 'react'

// isConfirm은 구분용
// true이면, bg-blud, text-white
// false이면, bg-gray, text-black
export default function ButtonActive({btnTxt, clickBtn, isConfirm}) {
  const btnClass = useMemo(() => {
    return isConfirm ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
  }, [isConfirm])
  
  return (
    <button className={`${btnClass} h-8 rounded-lg font-bold text-lg flex-grow`} onClick={() => clickBtn()}>{btnTxt}</button>
  )
}
