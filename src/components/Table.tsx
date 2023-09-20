import { useSelector, useDispatch } from 'react-redux';
import { removeExpense, editExpense } from '../redux/actions/index';

function Table() {
  const { expenses } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => {
          const currency = expense.exchangeRates[expense.currency].name;
          const exchange = (parseFloat(expense.exchangeRates[expense.currency].ask))
            .toFixed(2);
          const convertedValue = (parseFloat(expense.value
            * expense.exchangeRates[expense.currency].ask)).toFixed(2);
          return (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{(parseFloat(expense.value)).toFixed(2)}</td>
              <td>{currency}</td>
              <td>{exchange}</td>
              <td>{convertedValue}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  onClick={ () => dispatch(editExpense(expense.id)) }
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => dispatch(removeExpense(expense.id, expenses)) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
