import { Link, NavLink } from "react-router-dom";
import "./layout.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Header = () => {
  const { IsAuthenticated } = useContext(AuthContext);
  const [header, setHeader] = useState(false)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {handleScroll(); }, [])

  function handleScroll() {
    if (window.scrollY >= 120) {
      setHeader(true)
    } else {
      setHeader(false);
    }
  }
  window.addEventListener("scroll", handleScroll);

  function handleToggle() {
    setToggle(true)
  }
 function closeToggle() {
    setToggle(false)
  }

  return (
    <Fragment>
      <header
        onScroll={() => handleScroll}
        className={header ? "headerScrol" : "header"}
      >
        <div className="container">
          <nav className="header__navbar">
            <div className="header__navbar__logo">
              {IsAuthenticated ? (
                <NavLink to="/my-blogs">My Blogs</NavLink>
              ) : (
                <Link to="/">
                  <img
                    src="/logo.svg"
                    alt="logo"
                    width={"140px"}
                    height={"28px"}
                  />
                </Link>
              )}
            </div>
            <div className="header__navbar__link">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/allposts">All Posts</NavLink>
              <NavLink to="/category">Category</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/blogs">Blogs</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
            <div className="header__navbar__toggle__btn">
              <button onClick={handleToggle}>
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
            <div className="header__navbar__link__login">
              {IsAuthenticated ? (
                <Link to="/account">Account</Link>
              ) : (
                <Link to="login">Login</Link>
              )}
            </div>
          </nav>
        </div>
      </header>
      <div
        className={toggle ? "header__navbar__open" : "header__navbar__toggle"}
      >
        <button onClick={closeToggle} className="close">
          ✖️
        </button>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/allposts">All Posts</NavLink>
        <NavLink to="/category">Category</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </Fragment>
  );
};

export default Header;
