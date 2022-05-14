import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { DefaultButton } from '~/components/Button';
import { DefaultInput } from '~/components/Form';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SingIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit(data) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
      password: Yup.string().required('Senha é obrigatória'),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    dispatch(signInRequest(data.email, data.password, navigate));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form onSubmit={handleSubmit}>
        <DefaultInput
          name="email"
          label="SEU E-MAIL"
          type="email"
          placeholder="exemplo@email.com"
        />
        <DefaultInput
          name="password"
          label="SUA SENHA"
          type="password"
          placeholder="*************"
        />

        <DefaultButton type="submit">
          {loading ? 'Carregando...' : 'Acessar'}
        </DefaultButton>
      </Form>
    </>
  );
}
