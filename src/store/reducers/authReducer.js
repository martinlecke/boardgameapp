import { IS_LOGGED_IN } from '../actionTypes';

const initialState = {
  isLoggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.loggedIn
      };
    }

    default:
      return state;
  }
}
