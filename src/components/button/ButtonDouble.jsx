import React from 'react'
import ButtonActive from './ButtonActive'

export default function ButtonDouble({btnCancelTxt, btnConfirmTxt, clickCancelBtn, clickConfirmBtn}) {
  return (
    <div className='flex justify-between grow space-x-4 mt-1'>
      <ButtonActive btnTxt={btnCancelTxt} clickBtn={clickCancelBtn} isConfirm={false}/>
      <ButtonActive btnTxt={btnConfirmTxt} clickBtn={clickConfirmBtn} isConfirm={true}/>
    </div>
  )
}
