import styled from 'styled-components';
import Popup from 'reactjs-popup';

export const PopUp = styled(Popup)`
  position: 'center center';

  &-content {
    background: rgb(255, 255, 255);
    width: 450px;

    padding: 25px 25px 25px 25px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #7d40e7;
  }

  &-overlay {
    background: rgba(0, 0, 0, 0.8);
    border: rgb(0, 0, 0, 0.7);
  }
`;
