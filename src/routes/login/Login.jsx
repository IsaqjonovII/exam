import React, { useState } from 'react'
import c from "./Login.module.css"
import { FaTimes } from "react-icons/fa"
import { Link, useLocation } from 'react-router-dom'
import { firebase } from "../../firebase/firebase"
import { useHistory } from 'react-router-dom'

const Login = ({ func, condition }) => {
  const location = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [con, setCon] = useState(condition)

  const signInWithEmail = (e) => {
    e.preventDefault()
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(e => {
        if (e) {
          e.uid === "gY1vLfjnWbcZwbVuaTY5Vr4C5Kh1" ?
            history.push("/admin") :
            history.push("/products")
        }
      })
      .catch(err => setErr("Email or password is incorrect"))
  }
  return location.pathname === "/admin" ? <></> :

    <div className={c.login} style={con && { right: 0, opacity: 1, transition: "1.5s" }}>
      <div className={c.container}>
        <h2>Login</h2>
        <FaTimes onClick={func} />
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
            placeholder="At least 8 characters"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8} />
        </div>
        {err && <div className={c.err}>
          <h4>{err}</h4>
          <a href="https://www.hogan.com/ww-en/password-forget/">Have you forgotten your login details?</a>
        </div>}

        <button type='submit' className={c.btn_login}>Login</button>
      </form>

      <div className={c.register}>
        <h2>Are you a new customer ?</h2>
        <p>By creating an account, you can access checkout faster, save multiple shipping addresses, view and track your orders and much more.</p>
        <Link to="/register">
          <button onClick={func} >Register</button>
        </Link>
      </div>
    </div>
}

export default Login
