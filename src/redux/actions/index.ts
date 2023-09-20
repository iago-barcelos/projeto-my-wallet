import { Dispatch } from 'redux';
import { Currencies, Expense } from '../../types';
import { getCurrencies } from '../../services/currenciesAPI';

export const GET_CURRENCIES_STARTED = 'GET_CURRENCIES_STARTED';
export const GET_CURRENCIES_SUCCESSFUL = 'GET_CURRENCIES_SUCCESSFUL';
export const GET_CURRENCIES_FAILED = 'GET_CURRENCIES_FAILED';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';

const getCurrenciesStarted = () => ({
  type: GET_CURRENCIES_SUCCESSFUL,
});

const getCurrenciesSuccessful = (data: Currencies) => ({
  type: GET_CURRENCIES_SUCCESSFUL,
  payload: data,
});

const getCurrenciesFailed = (error: string) => ({
  type: GET_CURRENCIES_FAILED,
  payload: {
    error,
  },
});

export const fetchCurrencies = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getCurrenciesStarted());
    const data = await getCurrencies();
    dispatch(getCurrenciesSuccessful(data));
  } catch (error: any) {
    dispatch(getCurrenciesFailed(error.message));
  }
};

export const saveEmail = (email: string) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

export const addExpense = (expense: Expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});
