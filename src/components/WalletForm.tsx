import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, fetchCurrencies } from '../redux/actions';
import { Dispatch, GlobalState } from '../types';

type FormValuesTypes = {
  description: string,
  tag: string,
  value: string | number,
  currency: string,
  method: string,
};

const initialFormValues = {
  description: '',
  tag: 'alimentacao',
  value: '',
  currency: 'USD',
  method: 'cash',
};

function WalletForm() {
  const [formValues, setFormValues] = useState<FormValuesTypes>(initialFormValues);
  const { description, tag, value, currency, method } = formValues;

  const dispatch: Dispatch = useDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, type } = event.target;
    const val = type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.value;
    setFormValues({
      ...formValues,
      [name]: val,
    });
  };

  const exchangeRates = useSelector((
    globalState: GlobalState,
  ) => globalState.wallet.exchangeRates);

  const currencies = useSelector((
    globalState: GlobalState,
  ) => globalState.wallet.currencies);

  const expenses = useSelector((
    globalState: GlobalState,
  ) => globalState.wallet.expenses);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchCurrencies());
    const expenseId = expenses.length > 0 ? expenses.length : 0;
    const expense = {
      id: expenseId,
      value: value.toString(),
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(addExpense(expense));
    setFormValues(initialFormValues);
  };

  const validateForm = () => {
    return description.length > 0 && Number(value) > 0;
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="description">
          Descrição da Despesa:
          <input
            data-testid="description-input"
            id="description"
            name="description"
            type="text"
            onChange={ handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="tag">
          Categoria da Despesa:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            onChange={ handleChange }
            value={ tag }
          >
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
        </label>
        <label htmlFor="value">
          Valor da Despesa:
          <input
            data-testid="value-input"
            id="value"
            name="value"
            type="number"
            onChange={ handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ handleChange }
            value={ currency }
          >
            {
              currencies && currencies
                .map((cur) => (
                  <option key={ cur } value={ cur }>{cur}</option>
                ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento
          <select
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartao de Debito">Cartão de débito</option>
            <option value="Cartao de Credito">Cartão de crédito</option>
          </select>
        </label>
        <button type="submit" disabled={ !validateForm() }>
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}

export default WalletForm;
