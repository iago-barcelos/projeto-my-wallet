import {
  screen,
} from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import * as APIModule from '../services/currenciesAPI';
import App from '../App';

beforeEach(() => {
  vi.spyOn(APIModule, 'getCurrencies').mockResolvedValue(mockData);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Testes da página de login', () => {
  test('se os elementos aparecem na tela', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/senha/i);
    expect(passwordInput).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(button).toBeInTheDocument();
  });

  test('página da carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    screen.getByText(/despesa total: r\$/i);
  });

  test('adicionar despesa na carteira', async () => {
    const initialState = {
      user: {
        email: 'admin@admin.com',
      },
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [],
        editor: false,
        idToEdit: 0,
        isFetchingCurrencies: false,
        fetchCurrenciesErrorMessage: '',
        exchangeRates: null,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição da despesa:/i,
    });
    const tagInput = screen.getByRole('combobox', {
      name: /categoria da despesa:/i,
    });
    const valueInput = screen.getByRole('spinbutton', {
      name: /valor da despesa:/i,
    });
    const currencyInput = screen.getByRole('combobox', {
      name: /moeda:/i,
    });
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento/i,
    });

    await userEvent.type(descriptionInput, 'despesa');
    await userEvent.selectOptions(tagInput, 'Lazer');
    await userEvent.type(valueInput, '55');
    await userEvent.selectOptions(currencyInput, 'USD');
    await userEvent.selectOptions(methodInput, 'Dinheiro');

    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    await userEvent.click(button);
  });
});
