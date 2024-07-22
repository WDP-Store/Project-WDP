// start
import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiLogOut, BiUser } from "react-icons/bi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAuthentication } from "../util/use-authentication";
import { CartContext } from "../components/CartContext";
import BannerAutoPlay from "./BannerAutoPlay";
import logo from "../images/logo-sdn.png";
import userIcon from "../images/user.svg";
import wishlistIcon from "../images/wishlist.svg";
import cartIcon from "../images/cart.svg";

import { MdLocalShipping } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { CiLogout, CiUser } from "react-icons/ci";
import { useAuth0 } from "@auth0/auth0-react";
import "./header.css";

const Header = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  const { isLogged } = useAuthentication();
  const navigate = useNavigate();
  const [thisUser, setThisUser] = useState();
  const { currentUser } = useAuthentication();
  const [searchKey, setSearchKey] = useState();
  const { cartQuantity, setCartQuantity } = useContext(CartContext);

  useEffect(() => {
    if (isLogged) {
      setThisUser(JSON.parse(localStorage.getItem("data")));
    }
  }, [isLogged]);

  const handleLogout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("cart"); //remove cart
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  return (
    <>
      {/* <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center justify-content-between">
            <div className="col-12 col-lg-3">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center ms-4 gap-4">
                  <NavLink to="/" className="nav-link nav-link-custom">Home</NavLink>
                  <NavLink to="/product" className="nav-link nav-link-custom">Our Store</NavLink>
                  <NavLink to="/blogs" className="nav-link nav-link-custom">Blogs</NavLink>
                  <NavLink to="/contact" className="nav-link nav-link-custom">Contact</NavLink>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-9 d-flex justify-content-end align-items-center gap-4">
              <div className="header-upper-links d-flex align-items-center gap-4">
                {isLogged && (
                  <NavLink to="/wishlist" className="d-flex align-items-center gap-2 text-white">
                    <img src={wishlistIcon} alt="Wishlist" />
                    Wishlist
                  </NavLink>
                )}
                {!isLogged && (
                  <NavLink to="/login" className="d-flex align-items-center gap-2 text-white">
                    <img src={userIcon} alt="User" />
                   Log in
                  </NavLink>
                )}
                {isLogged && (
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="userMenu"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={userIcon} alt="User" />
                      <span className="ms-2">{thisUser?.name}</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="userMenu">
                      <li>
                        <Link to={`/profile/${currentUser._id}`} className="dropdown-item">
                          <BiUser className="me-2" /> My profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/myOrder" className="dropdown-item">
                          <FaMoneyCheckDollar className="me-2" /> My orders
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="dropdown-item">
                          <BiLogOut className="me-2" /> Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                {isLogged && (
                  <Link to="/cart" className="d-flex align-items-center gap-2 text-white">
                    <img src={cartIcon} alt="Cart" />
                    <span className="badge bg-danger">{cartQuantity}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header> */}

      <div className="header">
        <div className="top_header">
          <div className="icon">
            <MdLocalShipping />
          </div>
          <div className="info">
            <p>Free Shipping When Shopping upto $1000</p>
          </div>
        </div>
        <div className="last_header">
          <button className="offer">
            <p>flat 10% over all iphone</p>
          </button>

          <div className={`nav ${!isLogged ? 'nav-outside' : ''}`}>
            <ul>
              <li>
                <Link to="/" className="link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/product" className="link">
                  Our Store
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="link">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="user_profile">
            {
              isLogged ? (
                <>
                  <div className="info">
                    <Link
                      to="/wishlist"
                      className="d-flex align-items-center gap-2 text-white text-decoration-none"
                    >
                      <img src={wishlistIcon} alt="Wishlist" />
                      <span>Wishlist</span>
                    </Link>
                  </div>
                  <div className="info">
                    <Link
                      to="/cart"
                      className="d-flex align-items-center gap-2 text-white"
                    >
                      <img src={cartIcon} alt="Cart" />
                      <span className="badge bg-danger">{cartQuantity}</span>
                    </Link>
                  </div>

                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="userMenu"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={userIcon} alt="User" />
                      <span className="ms-2">{thisUser?.name}</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="userMenu">
                      <li>
                        <Link
                          to={`/profile/${currentUser._id}`}
                          className="dropdown-item"
                        >
                          <BiUser className="me-2" /> My profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/myOrder" className="dropdown-item">
                          <FaMoneyCheckDollar className="me-2" /> My orders
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item"
                        >
                          <BiLogOut className="me-2 text-decoration-none" /> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="info">
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-2 text-white text-decoration-none"
                    >
                      <img src={userIcon} alt="User" />
                      <span>Login</span>
                    </Link>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

//end

// import React, { useState, useEffect, useContext } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { BsSearch } from "react-icons/bs";
// import { BiLogOut, BiUser } from "react-icons/bi";
// import { FaMoneyCheckDollar } from "react-icons/fa6";
// import { toast } from "react-toastify";
// import { useAuthentication } from "../util/use-authentication";
// import { CartContext } from "../components/CartContext";
// import BannerAutoPlay from "./BannerAutoPlay";
// import logo from "../images/logo-sdn.png";
// import userIcon from "../images/user.svg";
// import wishlistIcon from "../images/wishlist.svg";
// import cartIcon from "../images/cart.svg";

// const Header = () => {
//   const { isLogged } = useAuthentication();
//   const navigate = useNavigate();
//   const [thisUser, setThisUser] = useState();
//   const { currentUser } = useAuthentication();
//   const [searchKey, setSearchKey] = useState();
//   const { cartQuantity, setCartQuantity } = useContext(CartContext);

//   useEffect(() => {
//     if (isLogged) {
//       setThisUser(JSON.parse(localStorage.getItem("data")));
//     }
//   }, [isLogged]);

//   const handleLogout = () => {
//     localStorage.removeItem("data");
//     localStorage.removeItem("cart"); //remove cart
//     toast.success("Successfully logged out!");
//     navigate("/login");
//   };

//   return (
//     <>
//      <header className="header-upper py-3">
//         <div className="container-xxl">
//           <div className="row align-items-center justify-content-between">
//             <div className="col-12 col-lg-3">
//               <div className="d-flex align-items-center">
//                 <div className="d-flex align-items-center ms-4 gap-4">
//                   <NavLink to="/" className="nav-link nav-link-custom">Home</NavLink>
//                   <NavLink to="/product" className="nav-link nav-link-custom">Our Store</NavLink>
//                   <NavLink to="/blogs" className="nav-link nav-link-custom">Blogs</NavLink>
//                   <NavLink to="/contact" className="nav-link nav-link-custom">Contact</NavLink>
//                 </div>
//               </div>
//             </div>
//             <div className="col-12 col-lg-9 d-flex justify-content-end align-items-center gap-4">
//               <div className="header-upper-links d-flex align-items-center gap-4">
//                 {isLogged && (
//                   <NavLink to="/wishlist" className="d-flex align-items-center gap-2 text-white">
//                     <img src={wishlistIcon} alt="Wishlist" />
//                     Wishlist
//                   </NavLink>
//                 )}
//                 {!isLogged && (
//                   <NavLink to="/login" className="d-flex align-items-center gap-2 text-white">
//                     <img src={userIcon} alt="User" />
//                    Log in
//                   </NavLink>
//                 )}
//                 {isLogged && (
//                   <div className="dropdown">
//                     <button
//                       className="btn btn-secondary dropdown-toggle"
//                       type="button"
//                       id="userMenu"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       <img src={userIcon} alt="User" />
//                       <span className="ms-2">{thisUser?.name}</span>
//                     </button>
//                     <ul className="dropdown-menu" aria-labelledby="userMenu">
//                       <li>
//                         <Link to={`/profile/${currentUser._id}`} className="dropdown-item">
//                           <BiUser className="me-2" /> My profile
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/myOrder" className="dropdown-item">
//                           <FaMoneyCheckDollar className="me-2" /> My orders
//                         </Link>
//                       </li>
//                       <li>
//                         <button onClick={handleLogout} className="dropdown-item">
//                           <BiLogOut className="me-2" /> Log out
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//                 {isLogged && (
//                   <Link to="/cart" className="d-flex align-items-center gap-2 text-white">
//                     <img src={cartIcon} alt="Cart" />
//                     <span className="badge bg-danger">{cartQuantity}</span>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;
