import { Link } from "react-router-dom";
import shape1 from "../../assets/landing/shape1.svg";
import shape2 from "../../assets/landing/shape2.svg";
import shape3 from "../../assets/landing/shape3.svg";
import shape4 from "../../assets/landing/shape4.svg";
import shape6 from "../../assets/landing/shape6.svg";
import shape7 from "../../assets/landing/shape7.svg";
import banCircle from "../../assets/landing/ban-circle.svg";

function Main() {
  return (
    <>
      <main className="banner banner-content">
        <section className="main-content">
          <h1>
            Say goodbye to <span className="accent-color">paper-based</span>
            attendance tracking and hello to{" "}
            <span className="accent-color">digital convenience</span>. Easily monitor attendance
            using <span className="accent-color">cutting edge technology</span>.
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
    </>
  );
}

export default Main;
