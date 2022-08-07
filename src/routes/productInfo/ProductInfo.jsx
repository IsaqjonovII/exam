import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import c from "./ProductInfo.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { description } from "../../static/single_page"
import { Link } from "react-router-dom"

function ProductInfo({ match }) {
  const [clicked, setClicked] = useState(false)
  const [oneitem, setOneItem] = useState([])

  const toggle = index => {
    if (clicked === index) {
      return setClicked(null)
    }
    setClicked(index)
  }

  useEffect(() => {
    db.collection("Products").onSnapshot(product => {
      setOneItem(product.docs.map(pro_item => {
        return {
          id: pro_item.id,
          Name: pro_item.data().ProductName,
          mainImg: pro_item.data().MainImg,
          hoverImg: pro_item.data().HoverImg,
          Price: pro_item.data().ProductPrice,
          Color: pro_item.data().Color
        }
      }))
    })
  }, [])

  const single = oneitem?.filter(i => i.id === match.params.id)

  return (
    <div className={c.single_pro}>
      {
        single?.map(p => <div className={c.single_pro_container} key={p.id}>
          <div className={c.single_pro_img}>
            <img src={p.mainImg} alt="" />
          </div>

          <div className={c.desc}>
            <p id={c.p}>Home \ Sneakers \  New Arrivals Man</p>
            <h1>{p.Name} {p.Color}</h1>
            {
              description?.map((question, index) =>
                <div className={c.question} onClick={() => toggle(index)} key={index}>
                  <div className={c.icons}>
                    <p> {question.title} </p>
                    {
                      clicked === index ? <FaChevronUp /> : <FaChevronDown />
                    }
                  </div>

                  {
                    clicked === index ? <div className={c.ques_data}>
                      <p> {question.icon} {question.anw} </p>
                      {
                        question.ans && <div className={c.pro_img_color_con}>
                          {
                            question.ans && oneitem.slice(0, 5).map(q =>
                              <Link to={`${q.id}`} key={q.id}>
                                <div className={c.img_container_color} >
                                  <img src={q.mainImg} alt="" />
                                </div>
                              </Link>
                            )
                          }
                        </div>
                      }
                      {
                        index === 3 ? <div>
                          <p> <AiOutlineCheckCircle /> {question.extra}</p>
                        </div> : null
                      }

                    </div> : null
                  }
                </div>

              )
            }

          </div>
        </div>)
      }

      <div className={c.ability}>
        <div className={c.ability_card}>
          <div className={c.card_img}>
            <img src="https://www.hogan.com/medias/packaging-escusivo-e-messaggio-regalo-v1.png?context=bWFzdGVyfHJvb3R8OTEyfGltYWdlL3BuZ3xoZjEvaDFjLzkxNDkxMzkwNTg3MTgucG5nfGU2OWUwYzYxMWUwM2M0YTZjZWU4MmZmMTQ3NTM1Yzc3MWE4NzlmZmE1MzJiZDNiYWU5N2NjMmUwZjM4MTFiOTU&impolicy=noretina" alt="" />

          </div>
          <h3>Exclusive packaging and gift message</h3>
          <p>Your order will always be delivered in elegant Hogan packaging to which you can add a personalised card.</p>
          <p>Dicover more</p>
        </div>
        <div className={c.ability_card}>
          <div className={c.card_img}>
            <img src="https://www.hogan.com/medias/spedizioni-rapide.png?context=bWFzdGVyfHJvb3R8MTIzM3xpbWFnZS9wbmd8aGI2L2hkZS85MTQ5ODI0NjYzNTgyLnBuZ3xlOWVhYTZjNjc0ZmI4ODcxNzk2YjA5NjgyNDA1OGNmYWIzZWY5OTFjYmQ2YTBiN2M5ZmJiYjAxZjI4OGNkMWUx&impolicy=noretina" alt="" />
          </div>
          <h3>Fast shipping</h3>
          <p>- Standard Delivery - Delivery within 3-5 business days
            - Express Delivery - Delivery within 1-3 business days</p>
          <p>Dicover more</p>
        </div>
        <div className={c.ability_card}>
          <div className={c.card_img}>
            <img src="https://www.hogan.com/medias/cambio-1-.png?context=bWFzdGVyfHJvb3R8MTU3OHxpbWFnZS9wbmd8aGI4L2hiYS85MTQ5ODI0NzI5MTE4LnBuZ3xmNWMxZjlhMzBmMTVjNzk2NjVmNDk3YjEzZjdlZWNjOWIxZmI2NzVkODIxM2U2NjJiMTE5Yzc5NDE1Mzc2NjVj&impolicy=noretina" alt="" />
          </div>
          <h3>Free online return and exchange</h3>
          <p>If you wish to exchange or return an item purchased online, you can use our free exchange and return service within 14 days from delivery.

          </p>
          <p>Dicover more</p>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
