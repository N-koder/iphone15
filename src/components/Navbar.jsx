import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constants'

const Navbar = () => {
  return (
    <header className='flex w-full p-5 sm:px-10 justify-center items-center'>
        <nav className='flex w-full screen-max-width'>
            {/* logo */}
            <img src = {appleImg} alt="apple" width={21} height={21}/>
            
            {/* navs */}
            <div className='max-sm:hidden flex flex-1 justify-center items-center'>
                {navLists.map((navs , key) => (
                    <div key ={key} className='px-5  hover:text-sm text-gray-100 transition-all hover:text-white cursor-pointer'>{navs}</div>
                ))}
            </div>

            {/* search & cart */}
            <div className='flex max-sm:justify-end max-sm:flex-1 items-baseline gap-8 cursor-pointer'>
                <img src = {searchImg} width={21} height={21}/>
                <img src = {bagImg} width={21} height={21}/>
            </div>
            
            

        </nav>
    </header>
  )
}

export default Navbar