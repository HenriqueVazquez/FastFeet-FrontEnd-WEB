import React from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import PropTypes from 'prop-types';
import { PopUp } from './styles';

export default function Modal({ children }) {
  return (
    <PopUp
      trigger={
        <button type="button">
          <MdRemoveRedEye color="#8E5BE8" size={15} />
          <span>Visualizar</span>
        </button>
      }
      modal
    >
      {children}
    </PopUp>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};
