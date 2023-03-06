import { Helmet } from "react-helmet";
import Header from "../components/Home/Header";
import Main from "../components/Home/Main";
import Section from "../components/Home/Section";
import Footer from "../components/Home/Footer";

function Home() {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/styles/Landing.css" />
        <title>DLSUD SAMS</title>
        <script src="https://kit.fontawesome.com/8012ae3e72.js" crossorigin="anonymous"></script>
      </Helmet>
      <Header />
      <Main />
      <Section />
      <Footer />
    </>
  );
}
export default Home;
