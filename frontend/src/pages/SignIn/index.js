import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Input } from '~/components/Form';
import { signInRequest } from '~/store/modules/auth/actions';
import { Container } from './styles';
import logo from '~/assets/fastfeet-logo.png';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const formRef = useRef();

  async function handleSubmit(data) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Insira seu e-mail'),
      password: Yup.string().required('Insira sua senha'),
    });
    try {
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });
      const { email, password } = data;
      dispatch(signInRequest(email, password));
    } catch (err) {
      const validationErrors = {};
      const errors = [];
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          errors.push(error.message);
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
        toast.error(errors[0]);
      }
    }
  }

  return (
    <Container>
      <div>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <img src={logo} alt="FastFeet" />
          <Input
            label="SEU E-MAIL"
            name="email"
            type="email"
            placeholder="exemplo@gmail.com"
          />
          <Input
            label="SUA SENHA"
            name="password"
            type="password"
            placeholder="*************"
          />
          <button type="submit">
            {loading ? 'Carregando...' : 'Entrar no sistema'}
          </button>
        </Form>
      </div>
    </Container>
  );
}
