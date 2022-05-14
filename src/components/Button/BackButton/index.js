import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';

import { IconButton } from './styles';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <IconButton
      title="VOLTAR"
      Icon={MdKeyboardArrowLeft}
      onClick={() => navigate(-1)}
      background="#CCC"
    />
  );
}
