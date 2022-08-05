import React, { useState } from "react";
import { BsChevronUp } from "react-icons/bs"
import c from "../footer/Footer.module.css"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true)
    }
    else if (scrolled <= 300) {
      setVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div className={c.back_to} onClick={scrollToTop} style={visible ? {display: "flex"} : {display: "none"}}>
      <BsChevronUp  />
    </div>
  )
}