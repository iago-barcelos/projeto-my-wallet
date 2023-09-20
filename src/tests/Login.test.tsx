import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

describe('Testa tela de Login', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });
  });

  const email = 'email-input';
  const password = 'password-input';
  const emailTest = 'teste@teste.com';
  const passwordTest = '123456';
  it('Verifica se a tela de login possui os inputs de login e senha', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(email)).toBeInTheDocument();
    expect(screen.getByTestId(password)).toBeInTheDocument();
  });

  it('Verifica se antes das validações de input, o botão Entrar está desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
  });

  it('Verifica se após as validações de input, o botão Entrar será habilitado', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);

    await userEvent.type(emailInput, emailTest);
    await userEvent.type(passwordInput, passwordTest);

    expect(screen.getByRole('button', { name: 'Entrar' })).toHaveProperty('disabled', false);
  });

  it('Verifica se após as validações de input, o botão Entrar será habilitado', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);

    await userEvent.type(emailInput, emailTest);
    await userEvent.type(passwordInput, passwordTest);

    expect(screen.getByRole('button', { name: 'Entrar' })).toHaveProperty('disabled', false);
  });

  it('Uma vez validados os dados, verifica se rediciona para a rota /carteira', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);

    await userEvent.type(emailInput, emailTest);
    await userEvent.type(passwordInput, passwordTest);

    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });

    await userEvent.click(btnEntrar);

    expect(screen.getByText(/0.00/i)).toBeInTheDocument();
  });
});
