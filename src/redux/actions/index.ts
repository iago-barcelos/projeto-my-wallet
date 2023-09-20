export const loginUser = (email: string) => ({
  type: 'ADD_EMAIL',
  payload: email,
});

export const listCurrencies = (currencies: string[]) => ({
  type: 'LIST_CURRENCIES',
  payload: currencies,
});

export const fetchCurrencies = () => {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const currencies = Object.keys(data);
    console.log('currency', currencies);
    dispatch(listCurrencies(currencies));
  };
};

export const addExpenses = (dataExpense) => ({
  type: 'ADD_EXPENSE',
  payload: dataExpense,
});

export const addWallet = (expense) => {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch(addExpenses({ ...expense, exchangeRates: data }));
  };
};

export const deleteExpense = (expense) => ({
  type: 'UPDATE_EXPENSES',
  payload: expense,
});

export const removeExpense = (expenseId, updateExpenses) => {
  return (dispatch) => {
    const newExpenses = updateExpenses.filter((expense) => expense.id !== expenseId);
    dispatch(deleteExpense(newExpenses));
  };
};

export const editExpense = (id) => ({
  type: 'EDIT_EXPENSE',
  payload: id,
});

export const updateExpense = (expenses) => ({
  type: 'UPDATE_EXPENSES',
  payload: expenses,
});
