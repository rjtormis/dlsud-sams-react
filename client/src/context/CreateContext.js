import { useState, createContext } from "react";

const CreateContext = createContext();

export const CreateContextProvider = ({ children }) => {
  const [success, setSuccess] = useState(false);

  return (
    <CreateContext.Provider value={{ success, setSuccess }}>{children}</CreateContext.Provider>
  );
};

export default CreateContext;
