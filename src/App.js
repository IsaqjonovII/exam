import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./routes/home/Home"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Admin from "./routes/admin/Admin"
import ProductInfo from './routes/productInfo/ProductInfo';
import Auth from './routes/auth/Auth';
import Banner from "./components/banner/Banner"
import BackToTop from './components/backtoTop/BackTo';
import Cart from './routes/cart/Cart';

function App() {
  const [shadow, setShadow] = useState(false)
  const shadowChange = () => setShadow(true)


  shadow ? document.body.style.overflow = "hidden" :  document.body.style.overflow = "auto"

  return (
    <div className="app">
      <Router>
        <Navbar conditio={shadow} func={shadowChange} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Auth} />
          <Route path="/admin" component={Admin} />
          <Route exact path="/products" component={Banner} />
          <Route path="/products/:id" component={ProductInfo} />
          <Route path="/cart" component={Cart} />
        </Switch>
        <BackToTop />
        <Footer />
      </Router>
    </div>
  );
}

export default App;