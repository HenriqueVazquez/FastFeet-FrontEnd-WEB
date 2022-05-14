/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container, Label, Error, SelectInput } from './styles';

export default function AsyncSelect({ name, label, styles, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.value',
      getValue: (ref) => {
        const selectedInputValue = ref.state.prevProps.value.value;
        if (ref.state.prevProps.isMulti) {
          if (!selectedInputValue) {
            return [];
          }
          return selectedInputValue.map((option) => option.value);
        }
        if (!selectedInputValue) {
          return '';
        }
        return selectedInputValue;
      },
      clearValue(ref) {
        ref.clearValue();
      },
      setValue(ref, value) {
        ref.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <SelectInput
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        styles={styles}
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  styles: PropTypes.shape({}),
};

AsyncSelect.defaultProps = {
  label: '',
  styles: {},
};
