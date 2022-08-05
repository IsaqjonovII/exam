import React, { useEffect, useState } from 'react';
import axios from 'axios';
import c from "./ProductInfo.module.css"
import { useRouteMatch } from "react-router-dom"

function ProductInfo() {
  const route = useRouteMatch()
  const [oneItem, setOneItem] = useState([])

  useEffect(() => {
    axios.get(`products/${route.params.id}`)
      .then((product) => {
        setOneItem(product.data?.filter(i => i.id === route.params.id))
      })
      .catch((err) => console.log(err))
  }, [route.params.id])

  console.log(oneItem)


  return (
    <div className={c.single_pro}>
      <div className={c.container}>
        <div className={c.img_container}>
          {
            oneItem?.map(i => 
              <div className={c.item}>
                <h1>{i.Name} </h1>
              </div>  
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
