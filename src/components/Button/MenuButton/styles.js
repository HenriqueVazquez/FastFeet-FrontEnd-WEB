import styled from 'styled-components';

import { IconButton as Icon } from '../IconButton';

export const IconButton = styled(Icon)`
  margin-bottom: 5px;
  &:disabled {
    cursor: unset;
    background: transparent;
  }
`;
