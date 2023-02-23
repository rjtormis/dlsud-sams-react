import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import logo from '../assets/dlsu-d.png';
import shape1 from '../assets/landing/shape1.svg';
import shape2 from '../assets/landing/shape2.svg';
import shape3 from '../assets/landing/shape3.svg';
import shape4 from '../assets/landing/shape4.svg';
import shape6 from '../assets/landing/shape6.svg';
import shape7 from '../assets/landing/shape7.svg';
import banCircle from '../assets/landing/ban-circle.svg';

function Home() {
	window.addEventListener('scroll', function () {
		const header = document.querySelector('header');
		header.classList.toggle('sticky', window.scrollY > 0);
	});

	function toggleMobileNavigation() {
		var element = document.getElementById('mobile-navigation');

		if (element.classList.contains('mobile-navigation__open')) {
			element.classList.remove('mobile-navigation__open');
		} else {
			element.classList.add('mobile-navigation__open');
		}
	}
	return (
		<>
			<Helmet>
				<link rel="stylesheet" type="text/css" href="/styles/Landing.css" />
				<script src="/js/sticky.js"></script>
				<script src="https://kit.fontawesome.com/8012ae3e72.js" crossorigin="anonymous"></script>
			</Helmet>
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
			<main className="banner banner-content">
				<section className="main-content">
					<h1>
						Say goodbye to <span className="accent-color">paper-based</span>
						attendance tracking and hello to <span className="accent-color">digital convenience</span>. Easily monitor
						attendance using <span className="accent-color">cutting edge technology</span>.
					</h1>
					<div className="btn-container">
						<small>Meticuously planned and developed for students and professors.</small>
						<Link to="/register/student">
							<button className="custom-btn main-btn student-btn">For Students</button>
						</Link>
						<Link to="/register/professor">
							<button className="custom-btn main-btn prof-btn">For Professors</button>
						</Link>
					</div>
				</section>
				<section className="banner-shapes">
					<img className="ban-shape1 shape" src={shape1} alt="pacman shape" />
					<img className="ban-shape2 shape" src={shape2} alt="diamond shape" />
					<img className="ban-shape3 shape" src={shape3} alt="hexagon shape" />
					<img className="ban-shape4 shape" src={shape4} alt="triangle shape" />
					<img className="ban-shape6 shape" src={shape6} alt="circle shape" />
					<img className="ban-shape7 shape" src={shape7} alt="cross shape" />
					<span className="ban-circle1 circle">
						<img src={banCircle} alt="circle" />
					</span>
					<span className="ban-circle2 circle">
						<img src={banCircle} alt="circle" />
					</span>
					<span className="ban-circle3 circle">
						<img src={banCircle} alt="circle" />
					</span>
					<span className="ban-circle4 circle">
						<img src={banCircle} alt="circle" />
					</span>
				</section>
			</main>
			<section className="why-automate">
				<div id="features" className="why-automate-container">
					<div className="why-automate-card">
						<div className="card-item">
							<i className="fa fa-clock fa-icon"></i>
							<h3>Time-efficient</h3>
							<p>
								The system is designed to quickly and accurately identify individuals, reducing the time spent on taking
								attendance.
							</p>
						</div>
					</div>
					<div className="why-automate-card highlight">
						<div className="card-item">
							<i className="fa fa-window-restore fa-icon"></i>
							<h3>Responsive</h3>
							<p>
								The system is designed to be compatible with different screen sizes, devices, and web browsers, allowing
								for easy access and use on any device.
							</p>
						</div>
					</div>
					<div className="why-automate-card">
						<div className="card-item">
							<i className="fa fa-circle-user fa-icon"></i>
							<h3>User-friendly</h3>
							<p>
								The system features a simple and intuitive interface that makes it easy for users to navigate,
								understand, and use.
							</p>
						</div>
					</div>
					<div className="why-automate-card highlight">
						<div className="card-item">
							<i className="fa fa-server fa-icon"></i>
							<h3>Real-time</h3>
							<p>
								The system is designed to provide real-time updates on attendance, so users can stay on top of
								attendance data at all times.
							</p>
						</div>
					</div>
					<div className="why-automate-card">
						<div className="card-item">
							<i className="fa fa-circle-info fa-icon"></i>
							<h3>Time tracking</h3>
							<p>
								The system is designed to track the time when an individual is marked present, and generate reports on
								attendance times.
							</p>
						</div>
					</div>
					<div className="why-automate-card highlight">
						<div className="card-item">
							<i className="fa fa-leaf fa-icon"></i>
							<h3>Increased productivity</h3>
							<p>
								The system is designed to automate the attendance process and increase productivity by reducing manual
								tasks and errors
							</p>
						</div>
					</div>
				</div>
			</section>
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
export default Home;
