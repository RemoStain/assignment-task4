import React, { createContext } from 'react';

export const AuthenticationContext = createContext({
    value: null,
    setValue: () => { },
});

export const AuthenticationContextProvider = ({ children }) => {
    const [value, setValue] = React.useState(null);

    return (
        <AuthenticationContext.Provider value= {{ value, setValue }}>
            { children }
        < /AuthenticationContext.Provider>
  );
};
