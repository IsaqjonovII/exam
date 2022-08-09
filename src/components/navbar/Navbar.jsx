import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ImLocation, ImSearch } from "react-icons/im"
import { BsQuestionCircle, BsBag } from "react-icons/bs"
import { Link, useHistory, useLocation } from 'react-router-dom';
import NAVBAR_DATA, { shopByStyle } from '../../static/navbar_static';
import { IoPersonSharp } from "react-icons/io5";
import Logo from "../../assets/Logo.png";
import c from "./Navbar.module.css";

const Navbar = ({ condition, func }) => {
  const history = useHistory()
  const auth = useSelector(state => state.auth)
  const [navbarHover, setNavbarHover] = useState(false);
  const [woman, setWoman] = useState(false);
  const [man, setMan] = useState(false);
  const [junior, setJunior] = useState(false)
  const [rebel, setRebel] = useState(false);
  const [navbar, setNavbar] = useState(false)
  const { pathname } = useLocation();

  const setThemAllFalse = () => {
    if (condition) {
      setNavbarHover(false)
      setWoman(false)
      setMan(false)
      setJunior(false)
      setRebel(false)
    }
  }

  function changeNavStyle() {
    if (window.scrollY >= 300)
      setNavbar(true)
    else {
      setNavbar(false)
    }
  }
  window.addEventListener('scroll', changeNavStyle)

  const getAuth = () => {
    if (auth) {
      history.push("/cart")
      func(!condition)
    }
    else {
      history.push("/register")
    }
  }

  return pathname === "/cart" || pathname === "/admin" ? <></> :
    <div className={navbar ? c.navbarChanged : c.navbar} onMouseOut={() => {
      setNavbarHover(false)
      setWoman(false)
      setMan(false)
      setJunior(false)
      setRebel(false)
    }}>
      <nav className={navbar ? c.nav_top : c.navigation_top}>

        <div className={c.user_icon}>
          <ImLocation />
          <BsQuestionCircle />
          <p>Rest of World - English</p>
        </div>

        <Link to="/">
          <div className={navbar ? c.logo_nav : c.nav_logo}>
            <img src={Logo} alt="Hogan logo" />
          </div>
        </Link>

        <div className={navbar ? c.u_icon : c.user_icon}>

          <BsBag onClick={getAuth} />
          <IoPersonSharp onClick={func} />
          <ImSearch />
        </div>
      </nav>
      <div className={navbar ? c.nav_btm : c.navigation_btm}>
        <li>

          <h2 onMouseOver={() => {
            condition ?
            setThemAllFalse() :
            setNavbarHover(true)
          }} style={navbarHover ? { transform: "scaleX(1)" } : null} >
            <Link to="/products">Sneakers</Link> </h2>
          <div className={c.onHover} style={navbarHover ? { transform: "scaleY(1)" } : null}
            onMouseOut={() => setNavbarHover(false)}
            onMouseOver={() => setNavbarHover(true)}>
            {
              NAVBAR_DATA.Sneakers?.map((item, index) =>
                <div className={c.link} key={index}
                  style={navbarHover ? { opacity: 1, transition: "1.3s ease-in" } : null}>

                  <ul className={c.big_collection} >
                    <li><h3> {item.title} </h3></li>

                    <ul className={c.sm_collection}>
                      {
                        item.li?.map((itemli, index) =>
                          <li key={index}>  {itemli}</li>
                        )
                      }
                    </ul>

                    <li>{item.titleImg ? <div className={c.hover_img}>
                      <h3> {item.titleImg} </h3>
                      <img src={item.imgUrl} alt="" />
                    </div> : <></>}
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
        </li>
        <li>
          <h2 onMouseOver={() => {
            condition ? 
            setThemAllFalse() :
            setWoman(true)
          }}> Woman </h2>
          <div className={c.on_hover}
            style={woman ? { transform: "scaleY(1)" } : null}
            onMouseOut={() => setWoman(false)}
            onMouseOver={() => setWoman(true)}>
            <div className={c.links_container}>
              {
                NAVBAR_DATA.Woman?.map((item, index) =>

                  <div className={c.links} key={index}
                    style={woman ? { opacity: 1, transition: "800ms ease-in" } : null}>
                    <ul className={c.big_collection}>
                      <li><h3> {item.title} </h3></li>

                      <ul className={c.sm_collection}>
                        {
                          item.li?.map((linkli, index) =>
                            <li key={index}> {linkli} </li>
                          )
                        }
                      </ul>
                      <li>
                        {
                          item.titleImg ? <div className={c.img_hover}>
                            <h3> {item.titleImg} </h3>
                            <img src={item.imgUrl} alt="" />
                          </div> : <></>
                        }
                      </li>
                    </ul>
                  </div>

                )
              }
            </div>
            <div className={c.styles} style={woman ? { opacity: 1, transition: "800ms ease-in" } : null}>
              <h3>Shop by Styles</h3>
              <div className={c.img_box_con}>
                {
                  shopByStyle?.map((style, inx) =>
                    <div className={c.flex_container} key={inx}>
                      <img src={style.imgUrl} alt="" />
                      <p> {style.titleImg} </p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </li>
        <li>
          <h2 onMouseOver={() => {
            condition ?
            setThemAllFalse() :
            setMan(true)
          }}> Man </h2>
          <div className={c.on_hover} style={man ? { transform: "scaleY(1)" } : null}
            onMouseOut={() => setMan(false)}
            onMouseOver={() => setMan(true)}>
            <div className={c.links_container}>
              {
                NAVBAR_DATA.Man?.map((item, index) =>

                  <div className={c.links} key={index}
                    style={man ? { opacity: 1, transition: "800ms ease-in" } : null}>
                    <ul className={c.big_collection}>
                      <li><h3> {item.title} </h3></li>

                      <ul className={c.sm_collection}>
                        {
                          item.li?.map((linkli, index) =>
                            <li key={index}> {linkli} </li>
                          )
                        }
                      </ul>
                      <li>
                        {
                          item.titleImg ? <div className={c.img_hover}>
                            <h3> {item.titleImg} </h3>
                            <img src={item.imgUrl} alt="" />
                          </div> : <></>
                        }
                      </li>
                    </ul>
                  </div>

                )
              }
            </div>
            <div className={c.styles} style={man ? { opacity: 1, transition: "800ms ease-in" } : null}>
              <h3>Shop by Styles</h3>
              <div className={c.img_box_con}>
                {
                  shopByStyle?.map((style, inx) =>
                    <div className={c.flex_container} key={inx}>
                      <img src={style.imgUrl} alt="" />
                      <p> {style.titleImg} </p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </li>
        <li>
          <h2 onMouseOver={() => {
            condition ? 
            setThemAllFalse() :
            setJunior(true)
          }}> Juinor </h2>
          <div className={c.onHover} style={junior ? { transform: "scaleY(1)" } : null}
            onMouseOut={() => setJunior(false)}
            onMouseOver={() => setJunior(true)}>
            {
              NAVBAR_DATA.Junior?.map((item, index) =>
                <div className={c.link} key={index} style={junior ? { opacity: 1, transition: "800ms ease-in" } : { opacity: 0, transition: "150ms" }}>

                  <ul className={c.big_collection}>
                    <li><h3> {item.title} </h3></li>

                    <ul className={c.sm_collection} >
                      {
                        item.li?.map((itemli, index) =>
                          <li key={index}>  {itemli}</li>
                        )
                      }
                    </ul>

                    <li>{item.titleImg ? <div className={c.hover_img}>
                      <h3> {item.titleImg} </h3>
                      <img src={item.imgUrl} alt="" />
                    </div> : <></>}
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
        </li>
        <li>
          <h2 onMouseOver={() => {
            condition ?
            setThemAllFalse() :
            setRebel(true)
          }}> Rebel Society</h2>
          <div className={c.onHover} style={rebel ? { transform: "scaleY(1)", padding: "10px 0px 50px 150px" } : null}
            onMouseOut={() => setRebel(false)}
            onMouseOver={() => setRebel(true)}>
            {
              NAVBAR_DATA.Rebel?.map((item, index) =>
                <div className={c.link} key={index} style={rebel ? { opacity: 1, transition: "800ms ease-in" } : { opacity: 0, transition: "150ms" }}>

                  <ul className={c.big_collection}>
                    <li><h3> {item.title} </h3></li>

                    <ul className={c.sm_collection} >
                      {
                        item.li?.map((itemli, index) =>
                          <li key={index}>  {itemli}</li>
                        )
                      }
                    </ul>

                    <li>{item.titleImg ? <div className={c.hover_img}>
                      <h3> {item.titleImg} </h3>
                      <img src={item.imgUrl} alt="" />
                    </div> : <></>}
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
        </li>

      </div>
      <div className={woman || navbarHover || man || junior || rebel ? c.shadow : c.fade}></div>


    </div>
}

export default Navbar