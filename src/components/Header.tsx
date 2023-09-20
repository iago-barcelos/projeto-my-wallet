import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function Header() {
  const {
    user: {
      email,
    },
    wallet: {
      expenses,
    },
  } = useSelector((state: GlobalState) => state);
  return (
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
  );
}

export default Header;
