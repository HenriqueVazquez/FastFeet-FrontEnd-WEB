import Select from 'react-select/async';

import styled from 'styled-components';

import { colors } from '~/styles/colors';

export const Label = styled.label`
  color: #444;
  font-weight: bold;
  text-align: left;
  display: block;
  margin-bottom: 9px;
  margin-left: 1px;
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Error = styled.span`
  color: ${colors.danger};
  margin-top: 8px;
`;

export const SelectInput = styled(Select)``;
