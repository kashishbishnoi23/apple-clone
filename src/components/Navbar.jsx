import React from 'react'
import { appleImg, searchImg, bagImg } from '../utils'
import { navLists } from '../constants'
const Navbar = () => {
  return (
    <header className='w-full py-7'>
        <nav className='flex justify-between px-14 items-center'>
            <div>            
                <img src={appleImg} alt="Apple logo" width={12}></img>
            </div>

            <div className='flex max-sm:hidden'>
              {
                navLists.map((nav)=> (
                  <div key={nav} className='px-5 text-gray text-sm cursor-pointer hover:text-white transition-all'>
                    {nav}
                    </div>
                )
                )
              }
            </div>

            <div className='flex gap-3 items-center'>
              <img className='cursor-pointer' src={searchImg} alt="search" width={12}></img>

              <img className='cursor-pointer' src={bagImg} alt="bag" width={12}></img>

            </div>
            
        </nav>
    </header>
  )
}

export default Navbar

// install gsap : npm i gsap @gsap/react