import { IS_LOGGED_IN } from '../actionTypes';
import authApi from '../../api/auth';

export const isLoggedIn = () => {
  return dispatch => {
    authApi.isLoggedIn().then(loggedIn => {
      console.log('vad händer', loggedIn);
      dispatch({
        type: IS_LOGGED_IN,
        loggedIn
      });
    });
  };
};

export const login = credentials => {
  return dispatch => {
    authApi.login(credentials).then(({ loggedIn }) => {
      dispatch({
        type: IS_LOGGED_IN,
        loggedIn
      });
    });
  };
};

export const register = credentials => {
  return dispatch => {
    authApi.register(credentials).then(({ loggedIn }) => {
      dispatch({
        type: IS_LOGGED_IN,
        loggedIn
      });
    });
  };
};
