import { combineReducers } from 'redux';
import { user } from './user';
import { wallet } from './wallet';
import { walletUpdate } from './walletupdate';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers(
  { user, wallet, walletUpdate },
);

export default rootReducer; // delete essa linha e configure os seus reducers
