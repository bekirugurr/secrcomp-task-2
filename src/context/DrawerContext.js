import { createContext } from "react";

export const DrawerContext = createContext();

export const DrawerProvider = (props) => {
  return (
    <DrawerContext.Provider value={{}}>{props.children}</DrawerContext.Provider>
  );
};
