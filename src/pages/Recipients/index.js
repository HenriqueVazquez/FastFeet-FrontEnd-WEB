/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import { IconButton, MenuButton } from '~/components/Button';
import { SearchInput } from '~/components/Form';
import HeaderList from '~/components/HeaderList';
import api from '~/services/api';
import { useNavigate } from 'react-router-dom';

import RecipientItem from './RecipientItem';
import { Container, Content, Grid } from './styles';

export default function Recipients() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [recipients, setRecipients] = useState([]);

  async function loadRecipients() {
    const response = await api.get('/recipients', {
      params: {
        page,
      },
    });

    setRecipients(response.data);
  }

  useEffect(() => {
    loadRecipients();
  }, [page]); // eslint-disable-line

  async function handleSearchRecipient(e) {
    setPage(1);

    const response = await api.get('/recipients', {
      params: {
        recipientName: e.target.value,
        page,
      },
    });

    setRecipients(response.data);
  }

  return (
    <Container>
      <Content>
        <HeaderList title="Gerenciando destinatários">
          <SearchInput
            onChange={handleSearchRecipient}
            type="text"
            placeholder="Buscar por destinatários"
          />
          <IconButton
            Icon={MdAdd}
            title="CADASTRAR"
            onClick={() => navigate(`/recipient`)}
            type="button"
          />
        </HeaderList>
        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Nome</strong>
            <strong>Endereço</strong>
            <strong>Ações</strong>
          </section>
          {recipients.map((recipient) => (
            <RecipientItem
              updateRecipients={loadRecipients}
              key={recipient.id}
              data={recipient}
            />
          ))}
        </Grid>
        <section>
          <MenuButton
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            type="button"
          >
            voltar
          </MenuButton>
          <MenuButton
            isRight
            disabled={recipients.length < 5}
            type="button"
            onClick={() => setPage(page + 1)}
          >
            proximo
          </MenuButton>
        </section>
      </Content>
    </Container>
  );
}
