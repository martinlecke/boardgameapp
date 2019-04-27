import { TEST } from '../actionTypes';

const initialState = {
  test: 'initialState'
};

export default function(state = initialState, action) {
  console.log(state)
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
