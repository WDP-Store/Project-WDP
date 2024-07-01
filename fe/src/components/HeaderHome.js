import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import { createContext, useContext, useState, useEffect } from "react";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useAuthentication } from "../util/use-authentication";
import { toast } from "react-toastify";
import { BiLogOut } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaCartShopping, FaMoneyCheckDollar, FaUser } from "react-icons/fa6";
import logo from "../images/logo.png";
import toggleIcon from "../images/toggle-icon.png";
import flagUK from "../images/flag-uk.png";
// import logo from '../images/logo_home.png';
import { CartContext } from "../components/CartContext";
import BannerAutoPlay from "./BannerAutoPlay";
import { Carousel, CarouselItem } from "react-bootstrap";

const HeaderHome = () => {
    let { isLogged } = useAuthentication();
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
            {/* <!-- banner bg main start --> */}
            <div className="banner_bg_main" style={{ zIndex: 1 }}>
                {/* <!-- header top section start --> */}
                <div className="container">
                    <div className="header_section_top">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="custom_menu">
                                    <ul>
                                        <li>
                                            <Link style={{ textDecoration: "none" }} to="/">
                                                Best Sellers
                                            </Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: "none" }} to="/">
                                                Gift Ideas
                                            </Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: "none" }} to="/">
                                                New Releases
                                            </Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: "none" }} to="/">
                                                Today's Deals
                                            </Link>
                                        </li>
                                        <li>
                                            <Link style={{ textDecoration: "none" }} to="/">
                                                Customer Service
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- header top section start --> */}
                {/* <!-- logo section start --> */}
                <div className="logo_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="logo">
                                    <Link to={"/"}>
                                        <img src={logo} alt="logo" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- logo section end --> */}
                {/* <!-- header section start --> */}
                <div className="header_section">
                    <div className="container">
                        <div className="containt_main">
                            <div id="mySidenav" className="sidenav">
                                <a href="/" className="closebtn" onclick="closeNav()">
                                    &times;
                                </a>
                                <a href="index.html">Home</a>
                                <a href="fashion.html">Fashion</a>
                                <a href="electronic.html">Electronic</a>
                                <a href="jewellery.html">Jewellery</a>
                            </div>
                            <span className="toggle_icon" onclick="openNav()">
                                <img src={toggleIcon} alt="toggle-icon" />
                            </span>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    All Category
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">
                                        Action
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Another action
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </div>
                            </div>
                            <div className="main">
                                {/* <!-- Another variation with a button --> */}
                                <form action={"/ourStore/" + searchKey}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            onChange={(e) => setSearchKey(e.target.value)}
                                            className="form-control"
                                            placeholder="Search product ..."
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-secondary"
                                                type="button"
                                                style={{ backgroundColor: "#f26522", borderColor: "#f26522" }}
                                            >
                                                <BsSearch className="fs-6 m-0 mb-1" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="header_box">
                                <div className="lang_box">
                                    <Link
                                        to={"/"}
                                        title="Language"
                                        className="nav-link"
                                        data-toggle="dropdown"
                                        aria-expanded="true"
                                    >
                                        <img
                                            src={flagUK}
                                            alt="flag"
                                            className="mr-2"
                                            title="United Kingdom"
                                            style={{ marginRight: "1rem" }}
                                        />
                                        English <FaAngleDown className="ml-2 mb-0" aria-hidden="true"></FaAngleDown>
                                    </Link>
                                    <div className="dropdown-menu">
                                        <Link to={"/"} className="dropdown-item">
                                            <img src="images/flag-france.png" className="mr-2" alt="flag" />
                                            French
                                        </Link>
                                    </div>
                                </div>
                                <div className="login_menu">
                                    <ul>
                                        <li>
                                            {isLogged ? (
                                                <Link to="/cart">
                                                    <button type="button" class="btn position-relative">
                                                        <FaCartShopping
                                                            style={{ marginBottom: 0, color: "#fff" }}
                                                            aria-hidden="true"
                                                        ></FaCartShopping>
                                                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                            {cartQuantity}
                                                            <span class="visually-hidden">unread messages</span>
                                                        </span>
                                                    </button>
                                                </Link>
                                            ) : (
                                                <Link to={"/login"} style={{ textDecoration: "none" }}>
                                                    <FaCartShopping
                                                        style={{ marginBottom: 0 }}
                                                        aria-hidden="true"
                                                    ></FaCartShopping>
                                                    <span className="padding_10">Cart</span>
                                                </Link>
                                            )}
                                        </li>
                                        <li>
                                            {!isLogged && (
                                                <Link to="/login" style={{ textDecoration: "none" }}>
                                                    <FaUser aria-hidden="true" style={{ marginBottom: 0 }}></FaUser>
                                                    <span className="padding_10">User</span>
                                                </Link>
                                            )}
                                            <div className="col-12 col-lg-3">
                                                <div className="header-upper-links d-flex align-items-center justify-content-around row">
                                                    {isLogged && (
                                                        <div className="col-6 col-lg-3">
                                                            <Link
                                                                to="/wishlist"
                                                                className="d-flex align-items-center gap-10 text-white"
                                                            >
                                                                <img src={wishlist} alt="Wishlist" />
                                                                <p className="mb-0">Wishlist</p>
                                                            </Link>
                                                        </div>
                                                    )}
                                                    {isLogged && (
                                                        <div id="user-button-header" className="col-6 col-lg-3">
                                                            <Link
                                                                to={"/"}
                                                                className="d-flex align-items-center gap-10 text-white"
                                                            >
                                                                <img src={user} alt="user" />
                                                                <p
                                                                    style={{
                                                                        maxWidth: "10ch",
                                                                        whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                    className="mb-0"
                                                                >
                                                                    {thisUser?.name}
                                                                </p>
                                                            </Link>
                                                            <div id="function-box-header" style={{ zIndex: 99999999 }}>
                                                                <Link
                                                                    to={`/profile/${currentUser._id}`}
                                                                    className="d-flex align-items-center gap-10 text-white link-user-header-function"
                                                                >
                                                                    <BiUser className="m-0" />
                                                                    My profile
                                                                </Link>
                                                                <Link
                                                                    to={"/myOrder"}
                                                                    className="d-flex align-items-center gap-10 text-white link-user-header-function"
                                                                >
                                                                    <FaMoneyCheckDollar className="m-0" />
                                                                    My orders
                                                                </Link>
                                                                <Link
                                                                    onClick={() => handleLogout()}
                                                                    className="d-flex align-items-center gap-10 text-white link-user-header-function"
                                                                >
                                                                    <BiLogOut className="m-0" />
                                                                    Log out
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- header section end --> */}
                {/* <!-- banner section start --> */}
                <div className="banner_section layout_padding">
                    <div className="container">
                        {/* <div id="my_slider" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h1 className="banner_taital">
                                                Get Start <br />
                                                Your favorite shoping
                                            </h1>
                                            <div className="buynow_bt">
                                                <Link to={"/product"} style={{ textDecoration: "none" }}>
                                                    Buy Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h1 className="banner_taital">
                                                Get Start <br />
                                                Your favriot shoping 2
                                            </h1>
                                            <div className="buynow_bt">
                                                <Link to="/product" style={{ textDecoration: "none" }}>
                                                    Buy Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h1 className="banner_taital">
                                                Get Start <br />
                                                Your favriot shoping 3
                                            </h1>
                                            <div className="buynow_bt">
                                                <Link to={"/"}>Buy Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#my_slider" role="button" data-slide="prev">
                                <FaAngleLeft style={{ marginBottom: 0 }}></FaAngleLeft>
                            </a>
                            <a className="carousel-control-next" href="#my_slider" role="button" data-slide="next">
                                <FaAngleRight style={{ marginBottom: 0 }}></FaAngleRight>
                            </a>
                        </div> */}
                        <Carousel indicators={false}>
                            <CarouselItem>
                                <h1 className="banner_taital">
                                    Get Start <br />
                                    Your favorite shoping
                                </h1>
                                <div className="buynow_bt">
                                    <Link to={"/product"} style={{ textDecoration: "none" }}>
                                        Buy Now
                                    </Link>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div style={{ textAlign: "center" }}>
                                    <h2
                                        className="slide-heading slide-pc"
                                        style={{
                                            fontSize: "50px",
                                            lineHeight: "72.5px",
                                            color: "#ffffff",
                                            fontStyle: "normal",
                                            // marginBottom: "23px",
                                        }}
                                    >
                                        <strong style={{ color: "#10ffda" }}>Huge Saving</strong> on <br /> UHD
                                        Televisions
                                    </h2>
                                    <p class="slide-text slide-pc">Sale up to 70% off on selected items*</p>
                                    <Link
                                        to="/product"
                                        className="slide-button button"
                                        style={{ textDecoration: "none", marginTop: "1rem" }}
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            </CarouselItem>
                        </Carousel>
                    </div>
                </div>
                {/* <!-- banner section end --> */}
            </div>
            {/* <!-- banner bg main end --> */}
        </>
    );
};

export default HeaderHome;
