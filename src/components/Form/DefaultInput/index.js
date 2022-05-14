import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { UnInput, Error, Label } from './styles';

export default function DefaultInput({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Label htmlFor={fieldName}>
      <strong>{label}</strong>
      <UnInput ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <Error>{error}</Error>}
    </Label>
  );
}

DefaultInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

DefaultInput.defaultProps = {
  label: '',
};
