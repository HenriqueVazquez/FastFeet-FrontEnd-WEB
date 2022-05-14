import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import PropTypes from 'prop-types';

import { PopUp, PopUpButton } from './styles';

export default function MorePopUp({ children, ...rest }) {
  return (
    <PopUp
      trigger={
        <PopUpButton type="button">
          <MdMoreHoriz size={25} />
        </PopUpButton>
      }
      position="left center"
      {...rest}
    >
      {children}
    </PopUp>
  );
}

MorePopUp.propTypes = {
  children: PropTypes.element.isRequired,
};
