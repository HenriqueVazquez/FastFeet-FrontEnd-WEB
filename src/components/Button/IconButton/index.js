/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import PropTypes from 'prop-types';

import Button from './styles';

export function IconButton({ title, Icon, background, ...rest }) {
  const teste = rest.isRight;

  return teste ? (
    <Button background={background} {...rest}>
      {title}
      <Icon color="#fff" size={16} />
    </Button>
  ) : (
    <Button background={background} {...rest}>
      <Icon color="#fff" size={16} />
      {title}
    </Button>
  );
}

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  background: PropTypes.string,
};

IconButton.defaultProps = {
  background: '',
};
