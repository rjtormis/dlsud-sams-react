import { useContext } from "react";
import CreateContext from "../context/CreateContext";

function useCreate() {
  return useContext(CreateContext);
}
export default useCreate;
