import React from 'react'

export const InputBox = ({onChange,label,placeholder}) => {
  return (
    <div>
      <div className='text-sm font-medium text-left py-2'><label>{label}</label></div>
        <input type='text' onChange={onChange} placeholder={placeholder} className='w-full px-2 border border-slate-200' />
    </div>
  )
}
