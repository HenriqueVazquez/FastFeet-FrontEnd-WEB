import api from '~/services/api';

export async function loadInitialData(
  deliveryId,
  setDeliverymanVerify,
  setRecipientVerify,
  setProductVerify,
  setInitialOptions,
  setStatusVerify,
  setDeliverymen,
  setRecipients,
  formRef
) {
  if (deliveryId) {
    const response = await api.get(`/delivery/${deliveryId}`);
    let dataStatus;

    if (response.data.status === 'Postado') {
      dataStatus = 1;
      setDeliverymanVerify(true);
      setRecipientVerify(true);
      setProductVerify(true);
      setInitialOptions([
        {
          label: 'Retirado',
          value: 2,
        },
        {
          label: 'Cancelado',
          value: 4,
        },
      ]);
    } else if (response.data.status === 'Retirado') {
      dataStatus = 2;
      setDeliverymanVerify(true);
      setRecipientVerify(true);
      setProductVerify(true);
      setInitialOptions([
        {
          label: 'Entregue',
          value: 3,
        },
        {
          label: 'Cancelado',
          value: 4,
        },
      ]);
    } else if (response.data.status === 'Entregue') {
      dataStatus = 3;
      setDeliverymanVerify(true);
      setRecipientVerify(true);
      setProductVerify(true);
      setStatusVerify(true);
    } else if (response.data.status === 'Cancelado') {
      dataStatus = 4;
      setInitialOptions([
        {
          label: 'Postado',
          value: 1,
        },
      ]);
    }

    formRef.current.setData(response.data);
    formRef.current.setFieldValue('recipient_id', {
      value: response.data.recipient.id,
      label: response.data.recipient.name,
    });
    formRef.current.setFieldValue('deliveryman_id', {
      value: response.data.deliveryman.id,
      label: response.data.deliveryman.name,
    });
    formRef.current.setFieldValue('status', {
      value: dataStatus,
      label: response.data.status,
    });
  }
  const deliverymenResponse = await api.get('/deliverymen');

  const deliverymenData = deliverymenResponse.data.map((deliveryman) => ({
    value: deliveryman.id,
    label: deliveryman.name,
  }));
  setDeliverymen(deliverymenData);

  const recipientsResponse2 = await api.get('/recipients');

  const recipientsData = recipientsResponse2.data.map((recipient) => ({
    value: recipient.id,
    label: recipient.name,
  }));
  setRecipients(recipientsData);
}

export async function loadRecipientOptions(inputValue, callback) {
  const response = await api.get('/recipients', {
    params: {
      recipientName: inputValue,
    },
  });

  const data = response.data.map((recipient) => ({
    value: recipient.id,
    label: recipient.name,
  }));

  callback(data);
}

export async function loadDeliverymenOptions(inputValue, callback) {
  const response = await api.get('/deliverymen', {
    params: {
      nameFilter: inputValue,
    },
  });

  const data = response.data.map((deliveryman) => ({
    value: deliveryman.id,
    label: deliveryman.name,
  }));

  callback(data);
}
