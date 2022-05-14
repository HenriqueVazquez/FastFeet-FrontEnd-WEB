import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { SaveButton, BackButton } from '~/components/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { DefaultInput, PhotoInput, AsyncSelect } from '~/components/Form';
import HeaderForm from '~/components/HeaderForm';
import api from '~/services/api';

import { Container, Content, UnForm } from './styles';

export default function DeliverymanForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef(null);

  const status = [
    {
      label: 'Ativo',
      value: 1,
    },
    {
      label: 'Desativado',
      value: 2,
    },
  ];

  useEffect(() => {
    async function loadInitialData(deliverymanId) {
      if (id) {
        const response = await api.get(`/deliveryman/${deliverymanId}`);

        formRef.current.setData(response.data);
        formRef.current.setFieldValue('avatar', response?.data?.avatar?.url);
        formRef.current.setFieldValue('statuSituation', {
          value: response.data.status === 'Ativo' ? 1 : 2,
          label: response.data.status,
        });
      }
    }

    loadInitialData(id);
  }, [id]);

  const customStylesSelectInput = {
    control: (provided) => ({
      ...provided,
      height: 45,
    }),
  };

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('O email é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const file = new FormData();

      file.append('file', data.avatar);

      const responseFile = data.avatar
        ? await api.post('files/avatar', file)
        : null;

      if (id) {
        await api.put(`/deliveryman/${id}`, {
          name: data.name,
          email: data.email,
          avatar_id: responseFile?.data?.id,
          statuSituation: data.statuSituation,
        });

        navigate('/deliverymen');
        toast.success('Entregador editado com sucesso!');
      } else {
        await api.post('/deliveryman', {
          name: data.name,
          email: data.email,
          avatar_id: responseFile?.data?.id,
        });
        navigate('/deliverymen');
        toast.success('Entregador criado com sucesso!');
      }

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
      if (err?.response?.data) {
        const erroMensage = err.response.data;
        const message = JSON.stringify(Object.values(erroMensage).join(''));

        toast.error(message.substring(1, message.length - 1));
      }
    }
  }

  return (
    <Container>
      <Content>
        <HeaderForm
          title={id ? 'Edição de entregadores' : 'Cadastro de entregadores'}
        >
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <PhotoInput name="avatar" />
          <DefaultInput
            label="Nome"
            name="name"
            type="text"
            placeholder="Nome do entregador"
          />
          <DefaultInput
            id="email"
            label="Email"
            name="email"
            type="email"
            placeholder="exemplo@fastfeet.com"
            onKeyPress={(e) =>
              e.key === 'Enter' ? formRef.current.submitForm() : null
            }
          />
          {id ? (
            <AsyncSelect
              teste
              defaultOptions={status}
              type="text"
              label="Status do entregador"
              name="statuSituation"
              placeholder="Status do entregador"
              noOptionsMessage={() => 'Nenhum status encontrado'}
              styles={customStylesSelectInput}
            />
          ) : null}
        </UnForm>
      </Content>
    </Container>
  );
}
