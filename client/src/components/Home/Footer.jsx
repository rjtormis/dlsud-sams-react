function Footer() {
  return (
    <>
      <footer className="footer-distributed">
        <div className="footer-right">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-github"></i>
          </a>
        </div>
        <div className="footer-left">
          <p className="footer-links">
            <a className="link-1" href="#">
              Home
            </a>
            <a href="#">FAQs</a>
            <a href="#">Privacy Policy</a>
            <a id="contact" href="mailto:dlsud_sams@gmail.com">
              Contact Us
            </a>
          </p>
          <p>DLSU-D SAMS &copy; 2023</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
