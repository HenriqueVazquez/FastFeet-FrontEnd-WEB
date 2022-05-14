/* eslint-disable func-names */
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { SaveButton, BackButton } from '~/components/Button';
import { AsyncSelect, DefaultInput } from '~/components/Form';
import HeaderForm from '~/components/HeaderForm';
import api from '~/services/api';

import {
  loadDeliverymenOptions,
  loadRecipientOptions,
  loadInitialData,
} from './core/loadOptions';

import { customStylesSelectInput } from './styles/selectStyles';
import { Container, Content, UnForm } from './styles/styles';

export default function DeliveryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [deliverymanVerify, setDeliverymanVerify] = useState(false);
  const [recipientVerify, setRecipientVerify] = useState(false);
  const [productVerify, setProductVerify] = useState(false);
  const [StatusVerify, setStatusVerify] = useState(false);
  const [deliverymen, setDeliverymen] = useState({});
  const [recipients, setRecipients] = useState({});
  const [initialOptions, setInitialOptions] = useState([]);

  useEffect(() => {
    loadInitialData(
      id,
      setDeliverymanVerify,
      setRecipientVerify,
      setProductVerify,
      setInitialOptions,
      setStatusVerify,
      setDeliverymen,
      setRecipients,
      formRef
    );
  }, [id]);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('O nome do produto é obrigatório'),
        recipient_id: Yup.string().required('O destinatário é obrigatório'),
        deliveryman_id: Yup.string().required('O entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/delivery/${id}`, {
          product: data.product,
          recipient_id: data.recipient_id,
          deliveryman_id: data.deliveryman_id,
          situationStatus: data.status,
          startDate: data.status === 2 ? new Date() : null,
        });

        navigate('/deliveries');
        toast.success('Encomenda editada com sucesso!');
      } else {
        await api.post('/delivery', {
          product: data.product,
          recipient_id: data.recipient_id,
          deliveryman_id: data.deliveryman_id,
        });

        navigate('/deliveries');
        toast.success('Encomenda criada com sucesso!');
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
          title={id ? 'Edição de encomendas' : 'Cadastro de encomendas'}
        >
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <section>
            <AsyncSelect
              cacheOptions
              defaultOptions={recipients}
              type="text"
              label="Destinatário"
              name="recipient_id"
              isDisabled={recipientVerify}
              loadOptions={loadRecipientOptions}
              placeholder="Destinatários"
              noOptionsMessage={() => 'Nenhum destinatário encontrado'}
              styles={customStylesSelectInput}
            />
            <AsyncSelect
              defaultOptions={deliverymen}
              isDisabled={deliverymanVerify}
              type="text"
              label="Entregador"
              name="deliveryman_id"
              placeholder="Entregadores"
              noOptionsMessage={() => 'Nenhum entregador encontrado'}
              loadOptions={loadDeliverymenOptions}
              styles={customStylesSelectInput}
            />
            {id ? (
              <AsyncSelect
                defaultOptions={initialOptions}
                isDisabled={StatusVerify}
                type="text"
                id="status"
                label="Status da entrega"
                name="status"
                placeholder="Status da entrega"
                noOptionsMessage={() => 'Nenhum status encontrado'}
                styles={customStylesSelectInput}
              />
            ) : null}
          </section>
          <DefaultInput
            disabled={productVerify}
            label="Nome do produto"
            name="product"
            type="text"
            placeholder="Nome do produto"
            onKeyPress={(e) =>
              e.key === 'Enter' ? formRef.current.submitForm() : null
            }
          />
        </UnForm>
      </Content>
    </Container>
  );
}
