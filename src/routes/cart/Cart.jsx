import React, { useState } from 'react'
import c from "./Cart.module.css"
import { Link } from "react-router-dom"
import logo from "../../assets/Logo.png"
import { HiOutlinePlus } from "react-icons/hi"
import question_data from "../../static/question"
import { payments } from "../../static/footer_data"
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa"
import { AiOutlineCheckCircle, AiOutlineMinus } from "react-icons/ai"

function Cart() {

  // const history = useHistory()
  const dispatch = useDispatch()
  const pro = useSelector(state => state.product)
  const [clicked, setClicked] = useState(false);
  const [inset, setInsert] = useState(false)

  const toggle = index => {
    if (clicked === index) {
      return setClicked(null)
    }

    setClicked(index)
  }


  const incProduct = (data) => {
    let iIndex = pro.findIndex(i => i.id === data.id);
    const newOrder = pro.map((order, inx) => {
      if (inx === iIndex) {
        return {
          ...order,
          qty: order.qty + 1
        }
      }
      else {
        return order
      }
    })
    dispatch({ type: "ADD_TO_CART", payload: newOrder })
  }


  const decProduct = (data) => {
    let itemIndex = pro.findIndex(i => i.id === data.id);
    const newOrder = pro.map((orderedPro, inx) => {
      if (inx === itemIndex) {
        return {
          ...orderedPro,
          qty: orderedPro.qty - 1
        }
      }
      else {
        return orderedPro
      }
    })
    dispatch({ type: "ADD_TO_CART", payload: newOrder })
  }

  const removePro = (data) => {
    
      let filteredPro = pro.filter(i => i.id !== data.id)
      dispatch({ type: "ADD_TO_CART", payload: filteredPro })
  }

  return (
    <div className={c.cart}>
      <nav>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </nav>
      <div className={c.shopping_bag}>
        <h3>Shopping Bag ({pro.length} items)</h3>
        <button>Proceed to Checkout</button>
      </div>
      <table className={c.table}>
        <thead>
          <tr className={c.tr}>
            <th>Product DEscription</th>
            <th></th>
            <th>Price</th>
            <th>Quatity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody >
          {
            pro?.map(productItem =>
              <tr key={productItem.id}>
                <td className={c.td_img}>
                  <img src={productItem.mainImg} alt="" />
                </td>
                <td className={c.td_desc}>
                  <h3>{productItem.Name}</h3>
                  <p>Size: 8</p>
                  <p>Colour: {productItem.Color}</p>
                  <div className={c.remove} title='Delete?' onClick={() => removePro(productItem)}><FaTimes />
                    <p className={c.remove} > Remove</p>
                  </div>
                </td>
                <td className={c.td_price} > ${productItem.Price} </td>
                <td> <div className={c.cart_counter}>
                  <button disabled={productItem.qty <= 1} onClick={() => decProduct(productItem)} > - </button>
                  <span> {productItem.qty} </span>
                  <button disabled={productItem.qty >= 5} onClick={() => incProduct(productItem)}> + </button>
                </div> </td>
                <td className={c.td_price}>${productItem.Price * productItem.qty}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <div className={c.ques_container}>
        <div className={c.questions}>
          {
            question_data?.map((question, index) =>
              <div className={c.question} onClick={() => toggle(index)} key={index}>
                <div className={c.icons}>
                  <h3> {question.ques} </h3>
                  {
                    clicked === index ? <AiOutlineMinus /> : <HiOutlinePlus />
                  }
                </div>
                {
                  clicked === index ? <div className={c.ques_data}>
                    <p> {question.icon} {question.anw} </p>

                    {
                      index === 0 ? <div>
                        <p> <AiOutlineCheckCircle /> {question.extra}</p>
                      </div> : null
                    }

                    {index === 1 &&
                      <div className={c.container_imgs_payments}>
                        {index === 1 ?
                          payments?.map((p, index) =>
                            <div className={c.img_con} key={index}>
                              <img src={p} alt="" />
                            </div>
                          ) : null
                        }
                      </div>
                    }
                  </div> : null

                }
              </div>

            )
          }
        </div>
        <div className={c.promo_code}>
          <div className={c.code_txt_container} style={inset ? { height: "100px", transition: "350ms ease" } : { height: "56px", transition: "400ms ease" }}>
            <div className={c.code}>
              <h3>promo code / gift card</h3>
              <p onClick={() => setInsert(!inset)} style={{ textDecoration: "underline", color: "#919191", textTransform: "uppercase", cursor: "pointer", userSelect: "none" }}>insert</p>
            </div>
            <div className={c.code} style={inset ? { transform: "scaleY(1)", transformOrigin: "top", transition: "250ms ease" } : { transformOrigin: "top", transform: "scaleY(0)", transition: "250ms ease" }}>
              <input type="text" placeholder='Enter Code' />
              <button>Add</button>
            </div>
          </div>
          <div className={c.code}>
            <p>Sub total</p>
            <p>${pro?.reduce((a, b) => a + (b.qty * b.Price), 0)}</p>
          </div>
          <div className={c.code}>
            <p>Total</p>
            <p>${pro?.reduce((a, b) => a + (b.qty * b.Price), 0)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
