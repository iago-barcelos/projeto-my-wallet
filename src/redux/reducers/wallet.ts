import { AnyAction } from 'redux';
import {
  ADD_EXPENSE,
  GET_CURRENCIES_FAILED,
  GET_CURRENCIES_STARTED,
  GET_CURRENCIES_SUCCESSFUL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetchingCurrencies: false,
  fetchCurrenciesErrorMessage: '',
  exchangeRates: null,
};

const walletReducer = (
  state = INITIAL_STATE,
  action: AnyAction,
) => {
  switch (action.type) {
    case GET_CURRENCIES_STARTED:
      return {
        ...state,
        isFetchingCurrencies: true,
      };

    case GET_CURRENCIES_FAILED:
      return {
        ...state,
        fetchCurrenciesErrorMessage: action.payload.error,
      };

    case GET_CURRENCIES_SUCCESSFUL:
      return {
        ...state,
        exchangeRates: action.payload,
        currencies: action.payload && Object.keys(action.payload)
          .filter((currency) => currency !== 'USDT'),
      };

    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    default:
      return state;
  }
};

export default walletReducer;
