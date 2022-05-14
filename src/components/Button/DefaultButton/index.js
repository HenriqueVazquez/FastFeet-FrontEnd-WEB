import styled from 'styled-components';

import { colors } from '~/styles/colors';

export default styled.button`
  background: ${colors.primary};

  color: #fff;
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  border-radius: 4px;
  border: 0;

  &:hover {
    font-size: 16.5px;
    &:disabled {
      font-size: 16px;
    }
  }
`;
