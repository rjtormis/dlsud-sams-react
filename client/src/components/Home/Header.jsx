import { Link } from "react-router-dom";
import logo from "../../assets/dlsu-d.png";

function Header() {
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  function toggleMobileNavigation() {
    var element = document.getElementById("mobile-navigation");

    if (element.classList.contains("mobile-navigation__open")) {
      element.classList.remove("mobile-navigation__open");
    } else {
      element.classList.add("mobile-navigation__open");
    }
  }
  return (
    <>
      <header className="banner-header">
        <section id="mobile-navigation" className="mobile-navigation mobile-navigation__open">
          <div className="close-button" onClick={toggleMobileNavigation}>
            <button>
              <i className="fa fa-close"></i>
            </button>
          </div>
          <ul className="mobile-links">
            <li>
              <Link to="/#features">Features</Link>
            </li>
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </section>
        <a className="img-link" href="#">
          <img className="logo" src={logo} alt="dlsu-d logo" />
        </a>
        <nav className="menu hide-element">
          <ul>
            <li>
              <Link to="/#features">Features</Link>
            </li>
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="nav-btn hide-element">
          <Link to="/login">
            <button className="custom-btn navigation-btn">Log In</button>
          </Link>
        </div>
        <div className="burger show-element">
          <button>
            <i className="fa fa-reorder"></i>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
