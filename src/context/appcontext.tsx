import React, { createContext, useState } from "react";

interface context {
  user: any;
  setuser: any;
}

interface AppProvider {
  children: any;
}

const contextDefaultValue = {
  user: {},
  setuser: () => {},
};

export const AppContext = createContext<context>(contextDefaultValue);

const AppContextProvider = ({ children }: AppProvider) => {
  const [user, setuser] = useState(contextDefaultValue);
  return (
    <AppContext.Provider value={{ user, setuser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
