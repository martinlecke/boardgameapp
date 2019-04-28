import { TEST } from '../actionTypes';

const initialState = {
  test: 'initialState'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST: {
      return {
        ...state,
        test: action.test
      };
    }

    default:
      return state;
  }
}
