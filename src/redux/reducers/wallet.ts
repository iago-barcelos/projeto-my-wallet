// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AnyAction } from 'redux';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case 'LIST_CURRENCIES':
      return ({
        ...state,
        currencies: action.payload,
      });
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case 'UPDATE_EXPENSES':
      return {
        ...state,
        expenses: [...action.payload],
      };
    default: return state;
  }
  return state;
};
