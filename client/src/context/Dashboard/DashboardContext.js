import axios from "axios";
import { createContext, useEffect } from "react";

const DashBoardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  return <DashBoardContext.Provider value={{}}>{children}</DashBoardContext.Provider>;
};
