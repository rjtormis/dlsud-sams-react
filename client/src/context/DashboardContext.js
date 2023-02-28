import axios from "axios";
import { createContext, useEffect } from "react";

const DashBoardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  useEffect(() => {
    console.log(1);
  });
  return <DashBoardContext.Provider value={{}}>{children}</DashBoardContext.Provider>;
};
