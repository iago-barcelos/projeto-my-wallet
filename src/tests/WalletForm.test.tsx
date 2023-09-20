import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('Testa tela Wallet', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });
  });

  const value = 'value-input';
  const description = 'description-input';

  test('Verifica se a tela Wallet possui os inputs necessários', () => {
    renderWithRouterAndRedux(<Wallet />);

    expect(screen.getByTestId(value)).toBeInTheDocument();
    expect(screen.getByTestId(description)).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
  });

  test('Verifica se a tela Wallet possui o botão de adicionar despesas', () => {
    renderWithRouterAndRedux(<Wallet />);

    expect(screen.getByRole('button', { name: 'Adicionar despesas' })).toBeInTheDocument();
  });

  test('Verifica se a tela renderiza corretamente o componente Header', () => {
    renderWithRouterAndRedux(<Wallet />);

    expect(screen.getByTestId('email-field')).toBeInTheDocument();
    expect(screen.getByTestId('total-field')).toBeInTheDocument();
    expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
  });

  test('Testa a funcionalidade dos inputs da tela Wallet', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId(value);
    const inputDescription = screen.getByTestId(description);

    await userEvent.type(inputValue, '2');
    await userEvent.type(inputDescription, 'teste');

    expect(screen.getByTestId(value)).toHaveValue(2);
    expect(screen.getByTestId(description)).toHaveValue('teste');
  });

  test('Testa reset após envio do formulário', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId(value);
    const inputDescription = screen.getByTestId(description);
    const btnAdd = screen.getByRole('button', { name: 'Adicionar despesas' });

    await userEvent.type(inputValue, '2');
    await userEvent.type(inputDescription, 'teste');
    await userEvent.click(btnAdd);

    expect(screen.getByText(/2.00/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
