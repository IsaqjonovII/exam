import React, { useState } from 'react'
import c from "./Auth.module.css"
import { auth } from "../../firebase/firebase"
import { useHistory, Link } from "react-router-dom"
import { useDispatch } from "react-redux"

function Auth() {
  const history = useHistory()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const [err, setErr] = useState('')

  const createUser = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          dispatch({ type: "SIGN_USER", payload: user })
          history.push("/")
          return true
        }
      })
      .catch(err => setErr('The email address is already in use by another account. Please use another email'))
  }


  return (
    <div className={c.auth}>
      <div className={c.container}>
        <div className={c.img_container}>
          <img src="https://www.hogan.com/medias/HYBRIS-REGISTER-left-banner-vertical-1200x1120-desktop.jpg?context=bWFzdGVyfHJvb3R8OTYwMjZ8aW1hZ2UvanBlZ3xoODMvaDA4LzkxODc5MDA4MTc0MzguanBnfDc0MGJjNWRhODkyZTU1YzQ1YzZlOTAxM2M4MjcxMjBmMTcyMjlkZGU3YWExYWQ0OTk1NmRkOWFjMTc3NDQyNjU&impolicy=noretina" alt="" />
        </div>
        <div className={c.container_form}>
          <form autoComplete='off' onSubmit={createUser}>
            <h1>Register to create an account</h1>
            <p className={c.p}>Required field*</p>
            <select required>
              <option value="Title">Title</option>
              <option value="Mr">Mr</option>
              <option value="mrs">Mrs.</option>
              <option value="mrs">Ms.</option>
            </select>
            <input type="text" placeholder='FIRST NAME*' required className={c.inp} />
            <input type="text" placeholder='LAST NAME*' required className={c.inp} />

            <select required>
              <option value="rest of world">Rest Of World</option>
              <option value="O'zbekiston">O'zbekiston</option>
              <option value="The Uk">The Uk</option>
              <option value="us">United States</option>
              <option value="rus">Russia</option>
            </select>
            <div className={c.gender}>
              <h4>Gender</h4>
              <label htmlFor="woman">
                <input required type="radio" name="gender" id="woman" />
                Woman
              </label>
              <label htmlFor="man">
                <input required type="radio" name="gender" id="man" />
                Man
              </label>
            </div>
            <div className={c.birthdate}>
              <h4>Birthdate</h4>
              <input required type="date" />
            </div>
            <div className={c.email}>
              <label htmlFor="">E-mail Address*</label>
              <input required type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={c.password}>
              <label htmlFor="">Password*</label>
              <input required type="password" minLength={8} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <h4>Minimum 8 characters and 1 upper case character</h4>

            <div className={c.checkbox_con}>
              <h4>By proceeding with the creation of an account, I acknowledge the Privacy Policy and I agree to</h4>

              <label htmlFor="stay">
                <input type="checkbox" id="stay" />
                Stay in touch with Hogan
              </label>
              <label htmlFor="service">
                <input type="checkbox" id="service" />
                Customised Services
              </label>
              {err && <h3 className={c.err}>{err}</h3>}
              <button type='submit'>Confirm and register</button>
            </div>
            <Link to="/products">Already have an account ?</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth