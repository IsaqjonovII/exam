import React, { useState, useEffect } from 'react'
import c from "./Banner.module.css"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { db } from "../../firebase/firebase"
import { useSelector } from 'react-redux'
import axios from 'axios'

function Banner() {
  const [hoverImg, setHoverImg] = useState(false)
  const [hoverlike, setHoverLike] = useState(false)
  const route = useRouteMatch()
  const [data, setData] = useState([])
  const history = useHistory();
  const user = useSelector(state => state.auth)

  const fetchData = () => {
    try {
      axios.get("products")
      .then((product) => console.log(product.data))
      .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
    return () => fetchData()
  }, [])

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
    if (user) {
      like()
    }
    else {
      history.push("/register")
    }

  }

  useEffect(() => {
    db.collection("Products").onSnapshot(pro => {
      setData(pro.docs.map(pro_item => {
        return {
          id: pro_item.id,
          Name: pro_item.data().ProductName,
          mainImg: pro_item.data().MainImg,
          hoverImg: pro_item.data().HoverImg,
          Price: pro_item.data().ProductPrice
        }
      }))
    })
  }, [])

  return (
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
            <div className={c.product_wrapper} key={item.id}>
              <div className={c.wrapper_top}>
                <p>new collection</p>
                <div className={c.icon} onMouseOver={() => like(item.id)} onMouseOut={() => setHoverLike(false)}>
                  {
                    hoverlike === item.id ? <FaHeart onMouseOver={hasUser} /> : <FaRegHeart />
                  }
                </div>
              </div>
              <Link to={`products/${item.id}`}>
                <div className={c.wrapper_img} onMouseOver={() => toggle(item.id)}
                  onMouseOut={() => setHoverImg(false)}>
                  {
                    hoverImg === item.id ? <img src={item?.hoverImg} alt="" />
                      : <img src={item?.mainImg} alt="" />
                  }
                </div>
                <div className={c.title_product}>
                  <h4> {item?.Name} </h4>
                  <h4> {item?.Price} </h4>
                </div>
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Banner