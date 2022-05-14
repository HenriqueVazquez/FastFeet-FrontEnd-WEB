import { lighten } from 'polished';
import styled from 'styled-components';

import { IconButton as Icon } from '../IconButton';

export const IconButton = styled(Icon)`
  &:hover {
    background: ${lighten(0.2, '#666')};
  }
`;
