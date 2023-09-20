import { SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (
  state = INITIAL_STATE,
  action: { type: string, payload: { email: string } },
) => {
  switch (action.type) {
    case SAVE_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };
      return state;

    default:
      return state;
  }
};

export default userReducer;
