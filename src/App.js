import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Admin from "./routes/admin/Admin";
import ProductInfo from "./routes/productInfo/ProductInfo";
import Auth from "./routes/auth/Auth";
import Banner from "./components/banner/Banner";
import Cart from "./routes/cart/Cart";
import { BsChevronUp } from "react-icons/bs";
import Login from "./routes/login/Login";
import BackToTop from "./components/backtoTop/BackTo";
import "./App.css";

function App() {
  const [shadow, setShadow] = useState(false);
  const shadowChange = () => setShadow(!shadow);

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  shadow
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div className="app">
      <Router>
        <BackToTop />
        <Navbar condition={shadow} func={shadowChange} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Auth} />
          <Route exact path="/products" component={Banner} />
          <Route path="/products/:id" component={ProductInfo} />
          <Route path="/cart" component={Cart} />
          <Route path="/admin" component={Admin} />
        </Switch>
        {shadow && <Login condition={shadow} func={shadowChange} />}

        <Footer />

        <div
          className={shadow ? "shadow" : "fade"}
          onClick={() => setShadow(!shadow)}
        ></div>

        <div
          className="back_to"
          onClick={scrollToTop}
          style={visible ? { display: "flex" } : { display: "none" }}
        >
          <BsChevronUp />
        </div>
      </Router>
    </div>
  );
}

export default App;
