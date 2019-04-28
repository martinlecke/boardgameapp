import { IS_LOGGED_IN } from '../actionTypes';

export const isLoggedIn = isLoggedIn => {
  return {
    type: IS_LOGGED_IN,
    isLoggedIn
  }
}