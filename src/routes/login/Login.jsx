import React, { useState } from 'react'
import c from "./Login.module.css"
import { FaTimes } from "react-icons/fa"
import { Link, useLocation } from 'react-router-dom'
import { firebase } from "../../firebase/firebase"
import { useHistory } from 'react-router-dom'

const Login = ({ func }) => {
  const [log, setLog] = useState(true);
  const location = useLocation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();

  const signInWithEmail = (e) => {
    e.preventDefault()
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(e => {
        e && history.push("/products")
      })
      .catch(err => console.log(err))
  }

  return location.pathname === "/register" || location.pathname === "/admin" ? <></> :
    <div className={c.login} style={log ? { right: 0, opacity: 1, transform: "scale(1)", transition: "350ms" } : { right: "-330px", opacity: 0, transition: "200ms", transform: "scaleX(0)" }}>
      <div className={c.container}>
        <h2>Login</h2>
        <FaTimes onClick={() => setLog(func)} />
      </div>

      <form onSubmit={signInWithEmail}>
        <p>Required field*</p>
        <div className={c.email}>
          <label htmlFor="">E-mail Address*</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={c.password}>
          <label htmlFor="">Password*</label>
          <input type="password"
            placeholder="At least 6 characters"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8} />
        </div>
        <a href="https://www.hogan.com/ww-en/password-forget/">Have you forgotten your login details?</a>
        
        <button type='submit' className={c.btn_login}>Login</button>
        <button onClick={async () => {await firebase.auth().signOut()}} className={c.btn_login}>Login</button>
      </form>

      <div className={c.register}>
        <h2>Are you a new customer ?</h2>
        <p>By creating an account, you can access checkout faster, save multiple shipping addresses, view and track your orders and much more.</p>
        <Link to="/register">
          <button onClick={() => setLog(false)} >Register</button>
        </Link>
      </div>
    </div>
}

export default Login
