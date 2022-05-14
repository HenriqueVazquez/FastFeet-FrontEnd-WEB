import styled from 'styled-components';
import Popup from 'reactjs-popup';

export const PopUp = styled(Popup)`
  &-content {
    background: rgb(255, 255, 255);
    font-family: 'Roboto', sans-serif;
    margin: auto;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0px 0px 3px #7d40e7;
  }

  &-arrow {
    color: rgba(125, 64, 231, 0.4);
  }
`;

export const PopUpButton = styled.button`
  background: none;
  border: none;
  color: #999;
  height: 25px;
  width: 20px;

  align-self: center;
  margin-left: 75%;
  &:hover {
    color: #7d40e7;
  }

  svg {
    &:hover {
      width: 27px;
      height: 27px;
    }
  }
`;
