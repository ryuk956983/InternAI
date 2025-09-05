import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import icon from "../assets/icon.png"

const Navbar = () => {
    const navlink=[
        {
            title:"Home",
            link:"#"
        },{
            title:"Internships",
            link:"#"
        },
        {
            title:"Companies",
            link:"#"
        },{
            title:"About",
            link:"#"
        },{
            title:"Contact",
            link:"#"
        }
    ]
  return (
    <nav className='flex  bg-white h-16 p-2 items-center'>
        <div className='h-full flex-1'>
            <img className='h-full' src={icon} alt="" />
        </div>
        <div className='flex-1  max-lg:hidden  '>
            <ul className='flex justify-between '>
            {
                navlink.map((el,ind)=>{
                    return <li key={ind}><a href={el.link}>{el.title}</a></li> 
                })
            }</ul>
        </div>
        <div className='flex-1 max-lg:hidden flex justify-end gap-10'>
            <button className='bg-[#ff7500] px-4 py-1 font-semibold text-gray-600 rounded-md cursor-pointer'>Log In</button>
            <button className='bg-[#ff7500] px-4 py-1 font-semibold text-gray-600 rounded-md cursor-pointer'>Sign Up</button>
        </div>
        <div className='hidden max-lg:block'>
            <GiHamburgerMenu size={30}/>
        </div>
    </nav>
  )
}

export default Navbar