import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type Currencies = {
  [key: string]: {
    code: string,
    codein: string,
    name: string,
    high: string,
    low: string,
    varBid: string,
    pctChange: string,
    bid: string,
    ask: string,
    timestamp: string,
    create_date: string,
  },
};

export type Expense = {
  id: number,
  description: string,
  tag: string,
  value: string,
  currency: string,
  method: string,
  exchangeRates: Currencies,
};

export type GlobalState = {
  user: {
    email: string,
  },
  wallet: {
    currencies: string[],
    expenses: {
      id: string,
      value: string,
      currency: string,
      method: string,
      tag: string,
      description: string,
      exchangeRates: Currencies,
    }[],
    editor: boolean,
    idToEdit: number,
    exchangeRates: Currencies,
  }
};

export type Dispatch = ThunkDispatch<GlobalState, null, AnyAction>;
