import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiMenu,
  FiChevronRight,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./Header.scss"; 
import { menuData, brandsData } from "./menuData";
import logoImg from "../../../image/House of Isabella.png";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
const Header = () => {
  const { openCart, cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [openDepartment, setOpenDepartment] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSearchOpen(false);
    setOpenSubMenu(null);
  }, [location]);

  const toggleSubMenu = (menuName: string) => {
    setOpenSubMenu(openSubMenu === menuName ? null : menuName);
  };

  const toggleDepartment = (deptId: string) => {
    setOpenDepartment(openDepartment === deptId ? null : deptId);
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  const messages = [
    "WORLDWIDE SHIPPING",
    "FREE DELIVERY ON ORDERS OVER £1000",
    "AROUND THE CLOCK CUSTOMER SERVICE",
  ];

  return (
    <>
      <div className={`search-overlay ${isSearchOpen ? "active" : ""}`}>
        <div className="container search-container">
          <input
            type="text"
            placeholder="Search for products..."
            autoFocus={isSearchOpen}
          />
          <button
            className="close-search"
            onClick={() => setIsSearchOpen(false)}
          >
            <FiX />
          </button>
        </div>
      </div>

      <header className={`header ${isSticky ? "sticky" : ""}`}>
        {!isSticky && (
          <div className="header__top">
            <div className="container">
              <Swiper
                direction={"horizontal"}
                spaceBetween={0}
                centeredSlides={true}
                loop={true}
                speed={1000}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                modules={[Autoplay]}
                className="top-bar-swiper"
              >
                {messages.map((msg, index) => (
                  <SwiperSlide key={index}>
                    <p>{msg}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
        <div className="header__middle-wrapper">
          <div className="container">
            <div className="header__middle">
              <div className="header__left">
                <button
                  className="icon-btn menu-btn"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <FiMenu />
                </button>
                <Link to="/wishlist" className="icon-btn wishlist-btn">
                  <FiHeart />
                  {wishlistCount > 0 && (
                    <span className="cart-count">{wishlistCount}</span>
                  )}
                </Link>
              </div>

              <div className="header__logo">
                <Link to="/">
                  <img
                    src={logoImg}
                    alt="House of Isabella"
                    className="logo-img"
                  />
                </Link>
              </div>

              <div className="header__right">
                <button
                  className="icon-btn"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  {isSearchOpen ? <FiX /> : <FiSearch />}
                </button>
                <Link to="/account" className="icon-btn">
                  <FiUser />
                </Link>
                <button className="icon-btn cart-btn" onClick={openCart}>
                  <FiShoppingBag />
                  <span className="cart-count">{cartCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="header__bottom-wrapper">
          <div className="container">
            <nav className="header__bottom">
              <ul className="nav-list">
                <li className="nav-item">
                  <NavLink to="/new">NEW IN</NavLink>
                </li>
                {menuData.map((menu) => {
                  if (menu.id === "design-styles")
                    return (
                      <li
                        key={menu.id}
                        className="nav-item"
                        onMouseEnter={() => setActiveMenu(menu.id)}
                        onMouseLeave={() => setActiveMenu(null)}
                      >
                        <NavLink
                          to={menu.path}
                          className={activeMenu === menu.id ? "active" : ""}
                        >
                          {menu.label}
                        </NavLink>
                        {activeMenu === menu.id && (
                          <div className={`mega-menu menu-${menu.id}`}>
                            <div className="mega-menu__container">
                              <div className="mega-menu__links-area">
                                {menu.sections.map((sec, i) => (
                                  <div key={i} className="mega-menu__column">
                                    <ul>
                                      {sec.links.map((l, j) => (
                                        <li key={j}>
                                          <Link to={l.path}>{l.name}</Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );

                  return (
                    <li
                      key={menu.id}
                      className="nav-item"
                      onMouseEnter={() => setActiveMenu(menu.id)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      <NavLink
                        to={menu.path}
                        className={activeMenu === menu.id ? "active" : ""}
                      >
                        {menu.label}
                      </NavLink>
                      {activeMenu === menu.id && menu.sections.length > 0 && (
                        <div className={`mega-menu menu-${menu.id}`}>
                          <div className="mega-menu__container">
                            <div className="mega-menu__links-area">
                              {menu.sections.map((section, idx) => (
                                <div key={idx} className="mega-menu__column">
                                  {section.heading && (
                                    <h4>{section.heading}</h4>
                                  )}
                                  <ul>
                                    {section.links.map((link, linkIdx) => (
                                      <li key={linkIdx}>
                                        <Link to={link.path}>{link.name}</Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            {menu.image && (
                              <div className="mega-menu__image-area">
                                <img src={menu.image} alt={menu.label} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
                <li className="nav-item">
                  <NavLink to="/outlet">OUTLET</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sale" className="sale-link">
                    SALE
                  </NavLink>
                </li>


                <li
                  className="nav-item"
                  onMouseEnter={() => setActiveMenu(brandsData.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <NavLink
                    to={brandsData.path}
                    className={activeMenu === brandsData.id ? "active" : ""}
                  >
                    {brandsData.label}
                  </NavLink>
                  {activeMenu === brandsData.id && (
                    <div className={`mega-menu menu-${brandsData.id}`}>
                      <div className="mega-menu__container">
                        <div className="mega-menu__links-area">
                          {brandsData.sections.map((section, idx) => (
                            <div key={idx} className="mega-menu__column">
                              <ul>
                                {section.links.map((link, linkIdx) => (
                                  <li key={linkIdx}>
                                    <Link to={link.path}>{link.name}</Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>

   
        <div
          className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
          onClick={closeSidebar}
        ></div>

        <div className={`site-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <button className="close-btn" onClick={closeSidebar}>
              <FiX size={24} />
            </button>
          </div>

          <div className="sidebar-content">
            <ul className="sidebar-nav">
              <li>
                <Link to="/new" className="sidebar-link" onClick={closeSidebar}>
                  New In
                </Link>
              </li>

              <li
                className={`accordion-item ${
                  openSubMenu === "departments" ? "open" : ""
                }`}
              >
                <div
                  className="accordion-header"
                  onClick={() => toggleSubMenu("departments")}
                >
                  <span>Departments</span>
                  <FiChevronDown
                    className={`arrow-icon ${
                      openSubMenu === "departments" ? "rotate" : ""
                    }`}
                  />
                </div>
                <div className="accordion-body">
                  <ul>
                    {menuData.map((item) => {
                      if (item.id === "design-styles") return null;
                      const hasSubItems =
                        item.sections && item.sections.length > 0;
                      const isOpen = openDepartment === item.id;

                      return (
                        <li key={item.id} className="sub-accordion-item">
                          {hasSubItems ? (
                            <div
                              className="sub-accordion-header"
                              onClick={() => toggleDepartment(item.id)}
                            >
                              <span className="sub-link-text">
                                {item.label}
                              </span>
                              <FiChevronRight
                                className={`sub-arrow ${
                                  isOpen ? "rotate" : ""
                                }`}
                              />
                            </div>
                          ) : (
                            <Link
                              to={item.path}
                              className="sub-accordion-header"
                              onClick={closeSidebar}
                            >
                              <span className="sub-link-text">
                                {item.label}
                              </span>
                            </Link>
                          )}

                          {hasSubItems && (
                            <div
                              className={`sub-accordion-body ${
                                isOpen ? "open" : ""
                              }`}
                            >
                              <ul>
                                {item.sections.map((section) =>
                                  section.links.map((link, idx) => (
                                    <li key={idx}>
                                      <Link
                                        to={link.path}
                                        className="nested-link"
                                        onClick={closeSidebar}
                                      >
                                        {link.name}
                                      </Link>
                                    </li>
                                  ))
                                )}
                              </ul>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>


              <li
                className={`accordion-item ${
                  openSubMenu === "brands" ? "open" : ""
                }`}
              >
                <div
                  className="accordion-header"
                  onClick={() => toggleSubMenu("brands")}
                >
                  <span>Our Brands</span>
                  <FiChevronDown
                    className={`arrow-icon ${
                      openSubMenu === "brands" ? "rotate" : ""
                    }`}
                  />
                </div>
                <div className="accordion-body">
                  <ul>
                    {brandsData.sections.map((section) =>
                      section.links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            to={link.path}
                            className="nested-link"
                            onClick={closeSidebar}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </li>

            
              <li
                className={`accordion-item ${
                  openSubMenu === "design-styles" ? "open" : ""
                }`}
              >
                <div
                  className="accordion-header"
                  onClick={() => toggleSubMenu("design-styles")}
                >
                  <span>Design Styles</span>
                  <FiChevronDown
                    className={`arrow-icon ${
                      openSubMenu === "design-styles" ? "rotate" : ""
                    }`}
                  />
                </div>
                <div className="accordion-body">
                  <ul>
                    {menuData
                      .find((item) => item.id === "design-styles")
                      ?.sections.map((section) =>
                        section.links.map((link, idx) => (
                          <li key={idx}>
                            <Link
                              to={link.path}
                              className="nested-link"
                              onClick={closeSidebar}
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))
                      )}
                  </ul>
                </div>
              </li>

              <li>
                <Link
                  to="/sale"
                  className="sidebar-link sale-text"
                  onClick={closeSidebar}
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div className="sidebar-footer">
            <div className="divider"></div>
            <div className="account-section">
              <Link
                to="/account"
                className="account-link"
                onClick={closeSidebar}
              >
                My account
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
