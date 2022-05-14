/* eslint-disable no-alert */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/MorePopUp';
import NamePhoto from '~/components/NamePhoto';
import api from '~/services/api';
import { colors } from '~/styles/colors';

import { Container, MoreConainer } from './styles';

export default function DeliverymanItem({ data, updateDeliverymen }) {
  const navigate = useNavigate();
  async function handleDelete() {
    const confirm = window.confirm(
      'Você tem certeza que deseja deletar esse entregador?'
    );

    if (!confirm) {
      toast.info('Encomenda não apagada!');
      return;
    }

    try {
      await api.delete(`/deliveryman/${data.id}`);
      updateDeliverymen();
      toast.success('Entregador apagado com sucesso!');
    } catch (err) {
      if (err?.response?.data) {
        const erroMensage = err.response.data;
        const message = JSON.stringify(Object.values(erroMensage).join(''));

        toast.error(message.substring(1, message.length - 1));
      }
    }
  }

  return (
    <Container>
      <small>#{data.id}</small>
      {data.avatar ? (
        <img src={data?.avatar?.url} alt="AvatarUrl" />
      ) : (
        <NamePhoto name={data.name} />
      )}
      <small>{data.name}</small>
      <small>{data.email}</small>
      <More>
        <MoreConainer>
          <div>
            <button
              onClick={() => navigate(`/deliveryman/${data.id}`)}
              type="button"
            >
              <MdEdit color={colors.info} size={15} />
              <span>Editar</span>
            </button>
          </div>
          <div>
            <button onClick={handleDelete} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Excluir</span>
            </button>
          </div>
        </MoreConainer>
      </More>
    </Container>
  );
}

DeliverymanItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }).isRequired,
  updateDeliverymen: PropTypes.func.isRequired,
};
