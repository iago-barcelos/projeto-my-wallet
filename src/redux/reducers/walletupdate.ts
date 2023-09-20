import { AnyAction } from 'redux';

const INITIAL_STATE = {
  isEdit: false,
  index: 0,
  expense: {
    id: 0,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangeRates: {},
  },
};

export const walletUpdate = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case 'EDIT_EXPENSE':
      return {
        id: action.payload,
        isEdit: true,
      };
    default: return state;
  }
};
