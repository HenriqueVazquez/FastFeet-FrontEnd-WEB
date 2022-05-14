import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import PropTypes from 'prop-types';

import { IconButton } from './styles';

export default function ButtonMenu({ disabled, onClick, isRight }) {
  return (
    <IconButton
      isRight={isRight}
      title={isRight ? 'Próximo' : 'Voltar'}
      Icon={isRight ? MdKeyboardArrowRight : MdKeyboardArrowLeft}
      disabled={disabled}
      type="button"
      onClick={onClick}
    />
  );
}

ButtonMenu.propTypes = {
  isRight: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

ButtonMenu.defaultProps = {
  isRight: false,
};
