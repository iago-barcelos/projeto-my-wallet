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

  test('Verifica se o botão excluir retira a despesa da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const btnAdd = screen.getByRole('button', { name: 'Adicionar despesas' });

    await userEvent.type(inputValue, '2');
    await userEvent.type(inputDescription, 'teste');
    await userEvent.click(btnAdd);

    const inputRemove = screen.getByText('teste');
    const btnExcluir = screen.getByTestId('delete-btn');
    await userEvent.click(btnExcluir);

    expect(inputRemove).not.toBeInTheDocument();
  });

  test('Verifica se o botão editar despesa eduta a despesa da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const btnAdd = screen.getByRole('button', { name: 'Adicionar despesas' });

    await userEvent.type(inputValue, '2');
    await userEvent.type(inputDescription, 'teste');
    await userEvent.click(btnAdd);

    const btnEditar = screen.getByTestId('edit-btn');
    await userEvent.click(btnEditar);
    await userEvent.type(inputDescription, 'newTeste');
    const btnEditarDespesas = screen.getByRole('button', { name: 'Editar despesas' });
    await userEvent.click(btnEditarDespesas);

    expect(screen.getByText('newTeste')).toBeInTheDocument();
  });
});
