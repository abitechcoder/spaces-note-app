import React from 'react'
import {BsFillArrowUpCircleFill} from "react-icons/bs"
import {animateScroll as scroll} from "react-scroll"

function ScrollToTop() {

    const scrollToTop = () => {
        scroll.scrollToTop();
    }
  return (
    <BsFillArrowUpCircleFill onClick={scrollToTop} className='text-[#7F6BFF] bg-white cursor-pointer w-10 h-10 absolute bottom-20 right-10'/>
  )
}

export default ScrollToTop