import { Helmet } from "react-helmet";
// Custom Hook
import MainGraph from "../../components/Dashboard/Main/MainGraph";
import MainHeader from "../../components/Dashboard/Main/MainHeader";
import MainTotal from "../../components/Dashboard/Main/MainTotal";

function Main() {
  return (
    <>
      <Helmet>
        <title>DLSUD SAMS | DASHBOARD</title>
      </Helmet>
      <MainHeader />
      <MainTotal />
      <MainGraph />
    </>
  );
}
export default Main;
