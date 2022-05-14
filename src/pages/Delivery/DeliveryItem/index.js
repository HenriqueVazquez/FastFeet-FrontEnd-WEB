/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/MorePopUp';
import api from '~/services/api';

import {
  colors,
  statusColorsText,
  statusColorsBackground,
} from '~/styles/colors';

import DeliveryModal from '../Modal';

import Status from './DeliveryStatus';
import { Container, MoreConainer } from './styles';

export default function DeliveryItem({ data, updateDeliveries }) {
  const navigate = useNavigate();

  async function handleDelete() {
    if (data.status === 'Cancelado') {
      toast.info('Encomenda já foi cancelada');
      return;
    }

    if (data.status === 'Entregue') {
      toast.info('Encomenda já entregue ');
      return;
    }

    const confirm = window.confirm(
      `Você tem certeza que deseja deletar a encomenda de id: ${data.id}?`
    );

    if (!confirm) {
      toast.info('Encomenda não foi cancelada!');
      return;
    }

    try {
      await api.delete(`/delivery/${data.id}`);
      updateDeliveries();
      toast.success('Encomenda apagada com sucesso!');
    } catch (err) {
      toast.error('Essa encomenda não pode ser deletada!');
    }
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.recipient.name}</small>
      <small>{data.product}</small>
      <small>{data.recipient.city}</small>
      <small>{data.recipient.uf}</small>
      <Status
        text={data.status}
        color={statusColorsText[data.status]}
        background={statusColorsBackground[data.status]}
      />
      <More>
        <MoreConainer>
          <div>
            <DeliveryModal data={data} />
          </div>
          <div>
            <button
              onClick={() => navigate(`/delivery/${data.id}`)}
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

DeliveryItem.propTypes = {
  updateDeliveries: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      uf: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
};
