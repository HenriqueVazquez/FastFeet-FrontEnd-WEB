/* eslint-disable no-unused-expressions */

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { SaveButton, BackButton } from '~/components/Button';
import { DefaultInput, AsyncSelect, MaskInput } from '~/components/Form';
import HeaderForm from '~/components/HeaderForm';
import api from '~/services/api';

import { customStylesSelectInput } from './styles/selectStyles';
import {
  Container,
  Content,
  UnForm,
  AutoAddress,
  EditableAddress,
} from './styles/styles';

export default function RecipientForm() {
  const [ufibge, setUfibge] = useState({});
  const [selectedCities, setSelectedCities] = useState({});
  const [validateZipCode, setValidateZipCode] = useState(false);

  const { id } = useParams();
  const formRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadInitialData() {
      const ibge = await api.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      );

      const ufs = await ibge.data.map((uf) => ({
        value: uf.sigla,
        label: uf.nome,
      }));
      setUfibge(ufs);

      if (id) {
        const response = await api.get(`/recipients/${id}`);
        const stateName = ufs.filter((uf) => uf.value === response.data.uf);

        formRef.current.setData(response.data);
        formRef.current.setFieldValue('city', {
          value: response.data.city,
          label: response.data.city,
        });
        formRef.current.setFieldValue('uf', {
          value: response.data.uf,
          label: stateName[0].label,
        });
      }
    }

    loadInitialData();
  }, [id]);

  async function getAddress(zipCode) {
    const response = await api.get(
      `https://ws.apicep.com/cep.json?code=${zipCode}`
    );

    if (response.data.ok === true) {
      setValidateZipCode(true);
      const { city, state, address } = response.data;
      const stateName = ufibge.filter((uf) => uf.value === state);

      formRef.current.setFieldValue('street', address);
      formRef.current.setFieldValue('city', {
        value: city,
        label: city,
      });
      formRef.current.setFieldValue('uf', {
        value: stateName[0].value,
        label: stateName[0].label,
      });
    }
    if (response.data.ok === false) {
      toast.error('CEP não encontrado');
    }
  }

  async function getCities(uf) {
    const ibgeCity = await api.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    const cities = await ibgeCity.data.map((city) => ({
      value: city.nome,
      label: city.nome,
    }));

    setSelectedCities(cities);
    return cities;
  }

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        street: Yup.string().required('A rua é obrigatória'),
        number: Yup.string().required('O número é obrigatório'),
        complement: Yup.string().notRequired(),
        city: Yup.string().required('A cidade é obrigatória'),
        uf: Yup.string().required('O estado é obrigatório'),
        zip_code: Yup.string().required('O CEP é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        if (validateZipCode === true) {
          await api.put(`/recipients/${id}`, {
            name: data.name,
            street: data.street,
            number: data.number,
            complement: data?.complement,
            city: data.city,
            uf: data.uf,
            zip_code: data.zip_code.replace('-', ''),
          });

          toast.success('Destinatário editado com sucesso!');
          navigate('/recipients');
        } else {
          toast.error('CEP inválido');
        }
      } else {
        const zipCode = data.zip_code.replace('-', '');

        await api.post('/recipient', {
          name: data.name,
          street: data.street,
          number: data.number,
          complement: data?.complement,
          city: data.city,
          uf: data.uf,
          zip_code: zipCode,
        });

        toast.success('Destinatário criado com sucesso!');
        navigate('/recipients');
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

  async function loadState(inputValue, callback) {
    const states = ufibge.filter((uf) =>
      uf.label
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(
          inputValue
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        )
    );

    callback(states);
  }

  async function loadCities(inputValue, callback) {
    const cities = selectedCities.filter((city) =>
      city.label
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(
          inputValue
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        )
    );

    callback(cities);
  }

  return (
    <Container>
      <Content>
        <HeaderForm
          title={id ? 'Edição de destinatário' : 'Cadastro de destinatário'}
        >
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <DefaultInput
            label="Nome"
            name="name"
            type="text"
            placeholder="Nome do destinatário"
          />

          <EditableAddress>
            <MaskInput
              id="zipCode"
              label="CEP"
              name="zip_code"
              mask="99999-999"
              onKeyPress={(e) => {
                e.key === 'Enter' && getAddress(e.target.value);
              }}
              maskPlaceholder={null}
              placeholder="Digite o CEP e aperte Enter"
              /* onKeyPress={e =>
								e.key === 'Enter' ? formRef.current.submitForm() : null
							} */
            />

            <DefaultInput
              label="Número"
              name="number"
              id="number"
              type="number"
              placeholder="Número da casa"
            />

            <DefaultInput
              label="Complemento"
              name="complement"
              id="complement"
              type="text"
            />
          </EditableAddress>

          <AutoAddress>
            <DefaultInput
              label="Rua"
              name="street"
              id="street"
              type="text"
              placeholder="Rua do destinatário"
            />

            <AsyncSelect
              defaultOptions={ufibge}
              loadOptions={loadState}
              type="text"
              id="uf"
              label="Estado"
              name="uf"
              placeholder="Estado"
              onChange={(e) => getCities(e.value)}
              noOptionsMessage={() => 'Nenhum status encontrado'}
              styles={customStylesSelectInput}
            />

            <AsyncSelect
              defaultOptions={selectedCities}
              loadOptions={loadCities}
              type="text"
              id="city"
              label="Cidade"
              name="city"
              styles={customStylesSelectInput}
              placeholder="Cidade"
              noOptionsMessage={() => 'Nenhum status encontrado'}
            />
          </AutoAddress>
        </UnForm>
      </Content>
    </Container>
  );
}
