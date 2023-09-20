import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Dispatch, GlobalState } from '../types';

import WalletForm from '../components/WalletForm';
import { fetchCurrencies } from '../redux/actions';

function Wallet() {
  const {
    user: {
      email,
    },
    wallet: {
      expenses,
    },
  } = useSelector((state: GlobalState) => state);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <>
      <header>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p>
          Despesa Total: R$
          {' '}
          <span data-testid="total-field">
            {expenses
            && expenses.reduce((acc, cur) => {
              return acc
              + (Number(cur.value) * Number(cur.exchangeRates[cur.currency].ask));
            }, 0).toFixed(2)}
          </span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
      <main>
        <WalletForm />
      </main>
    </>
  );
}

export default Wallet;
