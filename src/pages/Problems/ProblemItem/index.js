/* eslint-disable no-alert */
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import Modal from '~/components/Modal';
import More from '~/components/MorePopUp';
import api from '~/services/api';
import { colors } from '~/styles/colors';

import { Container, MoreConainer, ModalContainer } from './styles';

export default function ProblemItem({ data, updateProblems }) {
  async function handleCancel() {
    const confirm = window.confirm('Você tem certeza que deseja cancelar?');

    if (!confirm) {
      toast.error('Encomenda não cancelada!');
      return;
    }

    try {
      await api.delete(`/problem/${data._id}/cancel-delivery`);
      updateProblems();
      toast.success('Encomenda cancelada com sucesso!');
    } catch (err) {
      if (err?.response?.data) {
        const erroMensage = err.response.data;
        const message = JSON.stringify(Object.values(erroMensage).join(''));

        toast.info(message.substring(1, message.length - 1));
      }
    }
  }

  return (
    <Container>
      <small>#{data.delivery_id}</small>
      <small>{data._id}</small>
      <small>{data.description}</small>
      <More
        contentStyle={{
          width: '200px',
          borderRadius: '4px',
        }}
      >
        <MoreConainer>
          <div>
            <Modal>
              <ModalContainer>
                <strong>VIZUALIZAR PROBLEMA</strong>
                <p>{data.description}</p>
              </ModalContainer>
            </Modal>
          </div>
          <div>
            <button onClick={handleCancel} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Cancelar encomenda</span>
            </button>
          </div>
        </MoreConainer>
      </More>
    </Container>
  );
}

ProblemItem.propTypes = {
  data: PropTypes.shape({
    delivery_id: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  updateProblems: PropTypes.func.isRequired,
};
