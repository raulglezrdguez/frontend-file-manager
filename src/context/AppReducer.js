import {
  LOGIN,
  LOGOUT,
  SET_FILES,
  UPDATE_FILES,
  SWITCH_DARKMODE,
} from './types';

const AppReducer = (state, action) => {
  const { type, payload } = action;
  let darkMode = null;
  let user = null;
  let files = null;

  switch (type) {
    case SWITCH_DARKMODE:
      darkMode = !state.darkMode;
      localStorage.setItem('darkMode', darkMode);
      return { ...state, darkMode };

    case LOGIN:
      localStorage.setItem('token', payload.token);
      user = { ...state.user, ...action.payload };
      return {
        ...state,
        user,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
      };

    case SET_FILES:
      return { ...state, files: payload };
    case UPDATE_FILES:
      files = state.files.filter((u) => u.id !== payload.id);
      return { ...state, files };

    default:
      return state;
  }
};

export default AppReducer;
