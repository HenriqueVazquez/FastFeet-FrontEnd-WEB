/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { parseISO, format } from 'date-fns';

import { IconButton, MenuButton } from '~/components/Button';
import { SearchInput } from '~/components/Form';
import HeaderList from '~/components/HeaderList';
import api from '~/services/api';

import DeliveryItem from './DeliveryItem';
import { Container, Content, Grid } from './styles';

export default function Delivery() {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);

  function formatDates(data) {
    return data.map((delivery) => ({
      ...delivery,
      start_dateFormated: delivery.start_date
        ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
        : null,
      end_dateFormated: delivery.end_date
        ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
        : null,
    }));
  }

  async function handleSearchLoadDelivery() {
    const response = await api.get('/deliveries', {
      params: {
        productFilter: document.getElementById('inputFilter').value
          ? document.getElementById('inputFilter').value
          : '',
        page,
      },
    });

    const data = formatDates(response.data);

    setDeliveries(data);
  }

  useEffect(() => {
    handleSearchLoadDelivery();
  }, [page]);

  return (
    <Container>
      <Content>
        <HeaderList title="Gerenciando encomendas">
          <SearchInput
            onChange={handleSearchLoadDelivery}
            type="text"
            placeholder="Buscar por encomendas"
            id="inputFilter"
          />
          <IconButton
            Icon={MdAdd}
            title="CADASTRAR"
            onClick={() => navigate('/delivery')}
            type="button"
          />
        </HeaderList>

        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Destinatário</strong>
            <strong>Produto</strong>
            <strong>Cidade</strong>
            <strong>Estado</strong>
            <strong>Status</strong>
            <strong>Ações</strong>
          </section>
          {deliveries.map((delivery) => (
            <DeliveryItem
              updateDeliveries={handleSearchLoadDelivery}
              key={delivery.id}
              data={delivery}
            />
          ))}
        </Grid>
        <section>
          <MenuButton
            disabled={page === 1}
            type="button"
            onClick={() => setPage(page - 1)}
          />
          <MenuButton
            isRight
            disabled={deliveries.length < 5}
            type="button"
            onClick={() => setPage(page + 1)}
          />
        </section>
      </Content>
    </Container>
  );
}
