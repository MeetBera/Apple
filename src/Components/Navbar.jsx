import React from 'react'
import {appleImg, bagImg, searchImg} from '../utils'
import {navLists} from '../constants'

const Navbar = () => {
  return (
    <header className='w-full py-5 sm:px-10 flex justify-between items-center max-sm:p-2'>
        <nav className='w-full flex screen-max-width'>
            <img src={appleImg} alt='apple' width={14} height={18}/>
            <div className='flex flex-1 max-sm:hidden justify-center'>
                {navLists.map((nav => 
                    <div className='px-5 cursor-pointer text-gray-100 hover:text-white transition-all' key={nav}>
                        {nav}
                    </div>
                ))}
            </div>
            <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1 cursor-pointer'>
                <img src={searchImg} alt=" search icon" width={18} height={18}/>
                <img src={bagImg} alt="bag" width={18} height={18}/>
            </div>
        </nav>

    </header>
  )
}

export default Navbar