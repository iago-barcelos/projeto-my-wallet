import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveEmail } from '../redux/actions';

export type FormValuesTypes = {
  email: string,
  password: string,
};

const initialFormValues = {
  email: '',
  password: '',
};

function Login() {
  const [formValues, setFormValues] = useState<FormValuesTypes>(initialFormValues);
  const { email, password } = formValues;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, type } = event.target;
    const value = type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(saveEmail(email));
    navigate('/carteira');
  };

  const validateForm = (): boolean => {
    return !!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) && password.length >= 6;
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="email-input"
          id="email"
          name="email"
          onChange={ handleChange }
          placeholder="E-mail"
          type="email"
          value={ email }
        />
        <input
          data-testid="password-input"
          id="password"
          name="password"
          onChange={ handleChange }
          placeholder="Senha"
          type="password"
          value={ password }
        />
        <button disabled={ !validateForm() } type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
