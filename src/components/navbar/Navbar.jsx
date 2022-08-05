import React, { useState } from 'react'
import c from "./Navbar.module.css";
import { ImLocation, ImSearch } from "react-icons/im"
import { IoPersonSharp } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs"
import Logo from "../../assets/Logo.png";
import Login from "../../routes/login/Login"
import NAVBAR_DATA, { shopByStyle } from '../../static/navbar_static';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const history = useHistory()
  const user = useSelector(s => s.auth)
  const [navbarHover, setNavbarHover] = useState(false);
  const [woman, setWoman] = useState(false);
  const [man, setMan] = useState(false);
  const [junior, setJunior] = useState(false)
  const [rebel, setRebel] = useState(false);
  const [loginModal, setLoginModal] = useState(false)

  return (
    <div className={c.navbar} onMouseOut={() => {
      setNavbarHover(false)
      setWoman(false)
      setMan(false)
      setJunior(false)
      setRebel(false)
    }}>
      <div className={c.navigation_top}>

        <div className={c.user_icon}>
          <ImLocation />
          <BsQuestionCircle />
          <p>Rest of World - English</p>
        </div>

        <Link to="/">
          <div className={c.nav_logo}>
            <img src={Logo} alt="Hogan logo" />
          </div>
        </Link>

        <div className={c.user_icon}>
          <IoPersonSharp onClick={() => {
            user ? history.push("/cart") : setLoginModal(loginModal)
          }} />
          <ImSearch />
        </div>

      </div>
      <div className={c.navigation_btm}>
        <li>
          
          <h2 onMouseOver={() => {
            setNavbarHover(true)
            setLoginModal(false)
          }} style={navbarHover ? { transform: "scaleX(1)" } : null} > 
          <Link to="/products">Sneakers</Link> </h2>
          <div className={c.onHover} style={navbarHover ? { transform: "scaleY(1)" } : null} onMouseOut={() => setNavbarHover(false)}
            onMouseOver={() => setNavbarHover(true)}>
            {
              NAVBAR_DATA.Sneakers?.map(item =>
                <div className={c.link} key={item.id}
                style={navbarHover ? { opacity: 1, transition: "800ms ease-in" } : { opacity: 0, transition: "150ms" }}>

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
            setWoman(true)
            setLoginModal(false)
          }}> Woman </h2>
          <div className={c.on_hover} style={woman ? { transform: "scaleY(1)" } : null}
            onMouseOut={() => setWoman(false)}
            onMouseOver={() => setWoman(true)}>
            <div className={c.links_container}>
              {
                NAVBAR_DATA.Woman?.map(item =>

                  <div className={c.links} key={item.id}
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
            setMan(true)
            setLoginModal(false)
          }}> Man </h2>
          <div className={c.on_hover} style={man ? { transform: "scaleY(1)" } : null}
            onMouseOut={() => setMan(false)}
            onMouseOver={() => setMan(true)}>
            <div className={c.links_container}>
              {
                NAVBAR_DATA.Man?.map(item =>

                  <div className={c.links} key={item.id}
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
            setJunior(true)
            setLoginModal(false)
          }}> Juinor </h2>
          <div className={c.onHover} style={junior ? { transform: "scaleY(1)" } : null}
            onMouseOut={() => setJunior(false)}
            onMouseOver={() => setJunior(true)}>
            {
              NAVBAR_DATA.Junior?.map(item =>
                <div className={c.link} key={item.id} style={junior ? { opacity: 1, transition: "800ms ease-in" } : { opacity: 0, transition: "150ms" }}>

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
            setRebel(true)
            setLoginModal(false)
          }}> Rebel Society</h2>
          <div className={c.onHover} style={rebel ? { transform: "scaleY(1)", padding: "10px 0px 50px 150px" } : null}
            onMouseOut={() => setRebel(false)}
            onMouseOver={() => setRebel(true)}>
            {
              NAVBAR_DATA.Rebel?.map(item =>
                <div className={c.link} key={item.id} style={rebel ? { opacity: 1, transition: "800ms ease-in" } : { opacity: 0, transition: "150ms" }}>

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
      {
        loginModal ? <Login func={!loginModal} /> : <></>
      }
      <div className={woman || navbarHover || man || junior || loginModal || rebel ? c.shadow : c.fade} onClick={() => setLoginModal(false)}></div>


    </div>
  )
}

export default Navbar