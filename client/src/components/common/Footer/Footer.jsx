import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#313131]  px-8  py-5 text-white w-full'>
      <ul className='list-none flex justify-start gap-5 text-[#A9A9C6]'>
        <li className='border-r-2 pe-3 border-[#878787]'>Help</li>
          <li className='border-r-2 pe-3 border-[#878787]'>About</li>
         <li className='border-r-2 pe-3 border-[#878787]'>Feedback</li>
          <li className='border-r-2 pe-3 border-[#878787]'>Privacy</li>
          <li>日本語</li>
      </ul>
      <p className='text-[#878787] text-xl mt-1'>By Kyoto Games. Copyright 2018 by Andy Pickering.</p>
    </div>
  )
}

export default Footer