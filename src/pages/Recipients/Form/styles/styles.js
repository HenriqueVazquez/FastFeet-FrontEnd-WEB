import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
`;

export const UnForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
  background: #fff;

  width: 100%;
  border-radius: 4px;
`;

export const EditableAddress = styled.div`
  align-items: center;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 20px;
  width: 600px;
  #zipCode {
    width: 305px;
    margin-bottom: -19px;
  }
  #number {
    width: 165px;
  }

  #complement {
    width: 335px;
  }
`;

export const AutoAddress = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px;

  #street {
    width: 305px;
  }

  #uf {
    width: 250px;
  }

  #city {
    width: 237px;
  }

  input {
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
`;
