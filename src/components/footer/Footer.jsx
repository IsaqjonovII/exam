import React from 'react';
import c from "./Footer.module.css"
import { FOOTER_DATA, payments } from "../../static/footer_data"
import { BsArrowRight } from "react-icons/bs"
import { GrLocation } from "react-icons/gr"
import { FaFacebookF, FaInstagram, FaTwitter, 
         FaYoutube, FaPinterest, FaTumblr, 
         FaSpotify, FaWeibo } from "react-icons/fa"
import { SiWechat } from "react-icons/si"
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();

  return pathname === "/cart" ? <></> :
    <div className={c.footer}>
      <div className={c.footer_container}>
        {
          FOOTER_DATA?.map((footer_item, index) =>
            <ul className={c.collection_ul} key={index}>
              <li> <h3> {footer_item.title} </h3> </li>
              <ul> {footer_item.li?.map((item, inx) =>
                <li key={inx}> {item} </li>
              )} </ul>
            </ul>
          )
        }
        <div className={c.contact}>
          <h3>enter the world of hogan</h3>
          <p>Stay in the know with the latest on our Collections and range of services. Subscribe now to receive specially dedicated promotions, the Hogan newsletter and the chance to participate in exclusive initiatives and events.</p>
          <form autoComplete='off'>

            <input type="text" placeholder='enter your email*' />
            <button> <BsArrowRight /> </button>
          </form>
          <div className={c.contact_btm}>
            <h3>Find a Boutique</h3>
            <p>Search by Location</p>
            <form>
              <input type="text" placeholder='enter a city, zip code or coun...' />
              <button> <GrLocation /> </button>
            </form>
          </div>
        </div>
      </div>
      <div className={c.socials}>
        <h3>country/region*: <b>rest of the world</b> <Link to="some">change</Link> </h3>
        <div className={c.icons_container}>
          <FaFacebookF />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
          <FaPinterest />
          <FaTumblr />
          <FaSpotify />
          <FaWeibo />
          <SiWechat />
        </div>
      </div>
      <div className={c.footer_pay}>
        <small>TOD'S SPA - Registered Office Via Filippo Della Valle 1 - 63811 Sant'Elpidio a Mare (FM) - Italy\ \ Tel. 0734 8661 - Fax 0734 866280 - Tax Code / P. VAT and Register of Companies FM nr. 01113570442\ \ Share capital Euro 66,187,078 VAT - R.E.A. FM no. 114030 - export mechanographic no. FM 004894</small>
        <div className={c.payment_con}>
          <h5>accepted payments</h5>
          {
            payments?.map((p, index) =>
              <div className={c.img_con} key={index}>
                <img src={p} alt="" />
              </div>
            )
          }
        </div>
      </div>
    </div>
}

export default Footer