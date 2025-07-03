"use client"
import Link from "next/link"
import { FaBars } from "react-icons/fa6";
import { HeaderMenu } from "./HeaderMenu";
import { useState } from "react";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <header className="bg-[#000071] py-[15px]">
        <div className="container mx-auto px-[16px]">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white font-[800] sm:text-[28px] text-[20px] lg:flex-none flex-1">
              ITJobs
            </Link>
            <HeaderMenu showMenu={showMenu} />
            <div className="inline-flex items-center gap-x-[5px] text-white font-[600] sm:text-[16px] text-[12px]">
              <Link href="#" className="">
                Login
              </Link>
              <span className="">/</span>
              <Link href="#" className="">
                Register
              </Link>
            </div>
            <button 
              onClick={handleShowMenu}
              className="text-white text-[20px] ml-[12px] lg:hidden inline-block cursor-pointer"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
