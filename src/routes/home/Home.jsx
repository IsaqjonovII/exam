import React from 'react'
import { Link } from 'react-router-dom'
import c from "./Home.module.css"

function Home() {
  return (
    <div className={c.home}>
      <div className={c.home_img}>
        <img src="https://www.hogan.com/medias/Hogan-HP-29-07-dekstop.jpg?context=bWFzdGVyfHJvb3R8NTU3OTcwfGltYWdlL2pwZWd8aDVkL2g1NS85MTk3NDI3MTYzMTY2LmpwZ3xiMzMyMDQ3YzI5M2Q5NWNhNTlmNjQzOWE1Y2M2YTQ0NmViNTdhN2VlY2Q3ZTI1ZjEyZDg3YTZlNzlmNDhmNTdl&impolicy=noretina" alt="" />
        <div className={c.new_arr}>
          <div className={c.text}>
            <h2>New Arrivals</h2>
            <p>The new collection’s Hogan models are destined to become your go-to sneakers. Their multiple inspirations and aerodynamic lines define looks with a casual yet gritty essence.</p>
          </div>
          <div className={c.home_buttons}>
            <button> <Link to="/products">Women's Collection</Link> </button>
            <button> <Link to="/products"> Men's Collection</Link></button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
