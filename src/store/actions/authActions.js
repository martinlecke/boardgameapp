import { IS_LOGGED_IN } from '../actionTypes';
import authApi from '../../api/auth';

export const isLoggedIn = () => {
  return dispatch => {
    authApi.login().then(loggedIn => {
      console.log('vad händer', loggedIn)
      dispatch({
        type: IS_LOGGED_IN,
        loggedIn
      });
    });
  };
};
