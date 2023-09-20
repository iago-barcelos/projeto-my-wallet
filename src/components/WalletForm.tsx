import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  addWallet,
  fetchCurrencies,
  updateExpense,
} from '../redux/actions/index';

function WalletForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);
  const { currencies, expenses } = useSelector((state) => state.wallet);
  const { isEdit, id } = useSelector((state) => state.walletUpdate);

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [payment, setPayment] = useState('Dinheiro');
  const [category, setCategory] = useState('Alimentação');

  const resetState = () => {
    setValue('');
    setDescription('');
    setCurrency('USD');
    setPayment('Dinheiro');
    setCategory('Alimentação');
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    const expenseData = {
      id: expenses.length,
      value,
      description,
      currency,
      method: payment,
      tag: category,
    };
    dispatch(addWallet(expenseData));
    resetState();
  };

  const handlerSubmitEdit = (event) => {
    event.preventDefault();
    const newData = {
      value,
      description,
      currency,
      method: payment,
      tag: category,
    };
    const obj = expenses.find((element) => element.id === id);
    console.log('obj', obj);
    const newTable = expenses.map((expense) => {
      if (+expense.id === +id) {
        return {
          ...obj,
          ...newData,
        };
      }
      return expense;
    });
    dispatch(updateExpense(newTable));
  };

  return (
    <form
      action="submit"
      onSubmit={ (event) => (isEdit ? handlerSubmitEdit(event) : handlerSubmit(event)) }
    >
      <label htmlFor="value">
        Valor
        <input
          type="number"
          data-testid="value-input"
          value={ value }
          onChange={ (event) => setValue(event.target.value) }
        />
      </label>
      <label htmlFor="description">
        Descrição da Despesa
        <input
          type="text"
          data-testid="description-input"
          value={ description }
          onChange={ (event) => setDescription(event.target.value) }
        />
      </label>
      <label htmlFor="currency">
        Moeda
        <select
          id="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ (event) => setCurrency(event.target.value) }
        >
          {currencies.map((element, index) => {
            return (
              <option
                value={ element }
                key={ index }
              >
                { element }
              </option>
            );
          })}
        </select>
      </label>
      <label htmlFor="payment">
        Método de Pagamento
        <select
          id="payment"
          data-testid="method-input"
          value={ payment }
          onChange={ (event) => setPayment(event.target.value) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="category">
        Categoria da Despesa
        <select
          id="category"
          data-testid="tag-input"
          value={ category }
          onChange={ (event) => setCategory(event.target.value) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      {isEdit ? <button>Editar despesas</button> : <button>Adicionar despesas</button> }
    </form>
  );
}

export default WalletForm;
