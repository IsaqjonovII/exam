import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.module.css"

function Home() {
  return (
    <div className='home'>
      <h1>Continue shopping</h1>
      <Link to="/products" >Go</Link>
    </div>
  )
}

export default Home
