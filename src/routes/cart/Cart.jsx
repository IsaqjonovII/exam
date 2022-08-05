import React, { useState } from 'react'
import c from "./Cart.module.css"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import logo from "../../assets/Logo.png"
import { ImPlus, ImMinus } from "react-icons/im";
import question_data from "../../static/question"
import { payments } from "../../static/footer_data"
function Cart() {
  const history = useHistory()
  const dispatch = useDispatch()
  const pro = useSelector(state => state.product)

  const [clicked, setClicked] = useState(false);
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

  console.log(pro);

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
    if (window.confirm("Are you sure to delete this product")) {
      let filteredPro = pro.filter(i => i.id !== data.id)
      console.log(filteredPro);
      dispatch({ type: "ADD_TO_CART", payload: filteredPro })
    }
  }

  return (
    <div className={c.cart}>
      <nav>
        <img src={logo} alt="" />
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
                  <p>Colour: {productItem.Colour}</p>
                  <p onClick={() => removePro(productItem)} >Remove</p>
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
      <div className={c.questions}>
        {
          question_data?.map((question, index) =>
            <div className={c.question} onClick={() => toggle(index)}>
              <div className={c.icons}>
                <h3> {question.ques} </h3>
                {
                  clicked === index ? <ImMinus /> : <ImPlus />
                }
              </div>
              {
                  clicked === index ? <div className={c.ques_data}>
                    <p> {question.anw} </p>

                    <div className={c.container_imgs_payments}>
                    {index === 1 ?
                      payments?.map((p, index) =>
                        <div className={c.img_con} key={index}>
                          <img src={p} alt="" />
                        </div>
                      ) : null
                    }
                    </div>
                  </div> : null
                }
            </div>

          )
        }
      </div>
    </div>
  )
}

export default Cart
