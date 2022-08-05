import React from 'react'
import c from "./Cart.module.css"
import { firebase } from "../../firebase/firebase"
import { useHistory } from "react-router-dom"

function Cart() {
    const history = useHistory()
  return (
    <div className={c.cart}>
      <h1>Hello, <br />
      This is cart
      </h1>

      <button onClick={async () => {await firebase.auth().signOut(); history.push("/products")}} className={c.btn_login}>Logout</button>
    </div>
  )
}

export default Cart
