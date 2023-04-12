import { Helmet } from "react-helmet";
// import "../styles/student.css";
import logo from "../assets/resized-logo.png";
import profile from "../assets/spiderman.png";
function StudentDashboardLayout() {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css"
          integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY="
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Helmet>
      <header class="dashboard-header">
        <div class="dashboard-navigation">
          <button id="menu-btn" class="menu-btn">
            <span class="material-symbols-rounded menu">menu</span>
          </button>
        </div>
        <div class="dashboard-profile">
          <a href="profile.html">
            <img class="student-image" src={profile} alt="student profile" />
          </a>
        </div>
      </header>

      <aside class="sidebar" id="sidebar">
        <div class="sidebar-logo">
          <img src={logo} alt="" />
          <div class="close-btn" id="close-btn">
            <span class="close material-symbols-rounded add">close</span>
          </div>
        </div>
        <div class="sidebar-list">
          <a href="student_dashboard.html" class="sidebar-link">
            <span class="material-symbols-rounded">dashboard</span>
            <h3>Dashboard</h3>
          </a>
          <a href="classroom.html" class="sidebar-link">
            <span class="material-symbols-rounded">book</span>
            <h3>Classroom</h3>
          </a>
          <a href="profile.html" class="sidebar-link">
            <span class="material-symbols-rounded">account_circle</span>
            <h3>Profile</h3>
          </a>
          <a href="upload.html" class="sidebar-link">
            <span class="material-symbols-rounded">add_photo_alternate</span>
            <h3>Upload Image</h3>
          </a>
          <a href="settings.html" class="sidebar-link">
            <span class="material-symbols-rounded">settings</span>
            <h3>Settings</h3>
          </a>
          <a href="#" class="sidebar-link logout">
            <span class="material-symbols-rounded ">logout</span>
            <h3>Logout</h3>
          </a>
        </div>
      </aside>
    </>
  );
}
export default StudentDashboardLayout;
