import React, { useReducer } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import jwtDecode from 'jwt-decode';

import AppContext from './AppContext';
import AppReducer from './AppReducer';

import { darkTheme, lightTheme } from './theme';
import {
  SWITCH_DARKMODE,
  LOGIN,
  LOGOUT,
  SET_FILES,
  UPDATE_FILES,
} from './types';

let user = null;
const token = localStorage.getItem('token');
if (token && token !== 'undefined') {
  const decodedToken = jwtDecode(token);
  const expiresAt = new Date(decodedToken.exp * 1000);

  if (new Date() > expiresAt) {
    localStorage.removeItem('token');
  } else {
    user = decodedToken;
    user.token = token;
  }
} else {
  console.log('No token found');
}

let darkMode = localStorage.getItem('darkMode');
darkMode = darkMode === 'true';

const initialState = {
  darkMode,
  user,
  files: [],
};

const AppState = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const switchDarkMode = () => {
    dispatch({ type: SWITCH_DARKMODE, payload: '' });
  };

  const login = (payload) => {
    dispatch({ type: LOGIN, payload });
  };
  const logout = () => {
    dispatch({ type: LOGOUT, payload: '' });
  };

  const setFiles = (payload) => {
    dispatch({ type: SET_FILES, payload });
  };
  const updateFiles = (payload) => {
    dispatch({ type: UPDATE_FILES, payload });
  };

  const theme = state.darkMode ? darkTheme : lightTheme;

  return (
    <AppContext.Provider
      value={{
        darkMode: state.darkMode,
        switchDarkMode,
        user: state.user,
        files: state.files,
        setFiles,
        updateFiles,
        login,
        logout,
      }}
    >
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppState;
