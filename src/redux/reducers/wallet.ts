import { AnyAction } from 'redux';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (
  state = INITIAL_STATE,
  action: AnyAction,
) => {
  return state;
};

export default walletReducer;
