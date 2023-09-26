import { Link, NavLink } from "react-router-dom";
import "./layout.scss";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Header = () => {
  const { IsAuthenticated } = useContext(AuthContext);

  return (
    <header className="header">
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
            <div className="header__navbar__link__login">
              {IsAuthenticated ? (
                <Link to="/account">Account</Link>
              ) : (
                <Link to="login">Login</Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
