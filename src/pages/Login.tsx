import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = regex.test(email);
    return validEmail;
  };

  const validatePassword = () => {
    const validPassWord = password.length >= 6;
    return validPassWord;
  };

  const testEmail = validateEmail();
  const testPassword = validatePassword();
  const isDisabled = !(testEmail && testPassword);

  const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser(email));
    navigate('/carteira');
  };

  return (
    <form>
      <input
        data-testid="email-input"
        type="text"
        id="email"
        placeholder="E-mail"
        onChange={
          (event:ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
        }
      />
      <input
        data-testid="password-input"
        type="text"
        id="password"
        placeholder="Senha"
        onChange={
          (event:ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
        }
      />
      <button
        type="submit"
        disabled={ isDisabled }
        onClick={ (event) => handlerSubmit(event) }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
