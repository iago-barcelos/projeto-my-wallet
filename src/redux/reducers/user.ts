import { AnyAction } from 'redux';

const INITIAL_STATE = {
  email: '',
};

export const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case 'ADD_EMAIL':
      return ({
        email: action.payload,
      });
    default: return state;
  }
};
