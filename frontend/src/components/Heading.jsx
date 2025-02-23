import React, { Children } from 'react'

export const Heading = ({heading}) => {
  return (
    <div className='font-bold text-4xl pt-6'>
        {heading}
    </div>
  )
}
