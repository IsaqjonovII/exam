import React, { useState, useEffect } from 'react'
import c from "./Banner.module.css"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { db } from "../../firebase/firebase"
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../loader/Loader"

function Banner() {
  const dispatch = useDispatch()
  const [hoverImg, setHoverImg] = useState(false)
  const [hoverlike, setHoverLike] = useState(false)
  const { url } = useRouteMatch()
  const [data, setData] = useState([])
  const history = useHistory();
  const auth = useSelector(state => state.auth)
  const pro = useSelector(state => state.product)


  const addToCart = (data) => {
    let itemIndex = pro.findIndex(i => i.id === data.id)

    if (itemIndex < 0) {
      let newItem = {
        ...data,
        qty: 1
      }
      dispatch({ type: "ADD_TO_CART", payload: [...pro, newItem] })
    }
    else {
      const newOrder = pro.map((orderedPro, inx) => {
        if (inx === itemIndex) {
          return {
            ...orderedPro,
            qty: orderedPro.qty + 1
          }
        }
        else {
          return orderedPro
        }
      })
      dispatch({ type: "ADD_TO_CART", payload: newOrder })
    }
  }

  const toggle = index => {
    if (hoverImg === index) {
      return setHoverImg(null)
    }
    setHoverImg(index)
  }

  function like(inx) {
    if (hoverlike === inx) {
      return setHoverLike(null)
    }
    setHoverLike(inx)
  }

  const hasUser = e => {
    e.preventDefault();
    if (auth) {
      like()
    }
    else {
      history.push("/login")
    }

  }

  useEffect(() => {
    setTimeout(() => {
      db.collection("Products").onSnapshot(pro => {
          setData(pro.docs.map(pro_item => {
            return {
              id: pro_item.id,
              Name: pro_item.data().ProductName,
              mainImg: pro_item.data().MainImg,
              hoverImg: pro_item.data().HoverImg,
              Price: pro_item.data().ProductPrice,
              color: pro_item.data().Color
            }
          }))
        })
    }, 1500);
  }, [])


  return !data.length ? <Loader /> : (
    <div className={c.banner}>
      <div className={c.banner_text}>
        <h1>Men's Hogan Rebel </h1>
        <p>
          The iconic Hogan Rebel sneakers and hi-tops for men are reinterpreted in design and volumes, to make them even more dynamic and appealing. The new outsole comes with two blocks and engraved and interrupted lines. The upper, available in various combinations of leather, suede and nubuck, is designed with soft and essential lines, with the characteristic side slanted H or the monogram Hogan imprinted on the back.
        </p>
      </div>

      <div className={c.products_container}>
        {
          data?.map(item =>
            <div className={c.product_wrapper} key={item.id} data-aos="zoom-out-up" >
              <div className={c.wrapper_top}>
                <p>new collection</p>
                <div className={c.icon} onMouseOver={() => like(item.id)} onMouseOut={() => setHoverLike(false)}>
                  {
                    hoverlike === item.id ? <FaHeart onClick={hasUser} /> : <FaRegHeart />
                  }
                </div>
              </div>
              <Link to={`${url}/${item.id}`}>
                <div className={c.wrapper_img} onMouseOver={() => toggle(item.id)}
                  onMouseOut={() => setHoverImg(false)}>
                  {
                    hoverImg === item.id ? <img src={item?.hoverImg} alt="" />
                      : <img src={item?.mainImg} alt="" />
                  }
                </div>
                <div className={c.title_product}>
                  <h4> {item?.Name} {item?.color} </h4>
                  <h4> ${item?.Price} </h4>
                </div>
              </Link>
              <button className={c.btn} onClick={() => addToCart(item)}><span className={c.text}>Add To Cart</span><span>ADD TO CART</span></button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Banner