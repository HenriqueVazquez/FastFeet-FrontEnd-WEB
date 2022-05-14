import { darken } from 'polished';

export const customStylesSelectInput = {
  control: (provided) => ({
    ...provided,
    height: 45,
  }),

  menu: (provided) => ({
    ...provided,
    outline: 'none',
    borderRadius: 4,
    border: '1px solid #ddd',
    borderTop: 0,
    boxShadow: '0px 0px 5px #7D40E7',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#444',
    margin: '0',
    listStyle: 'none',
    scrollbars: 'none',

    '::-webkit-scrollbar': {
      display: 'none',
    },

    '&:focus': {
      background: '#7D40E7',
      color: '#fff',
    },
  }),
  option: (provided) => ({
    ...provided,
    outline: 'none',

    '&:hover': {
      backgroundColor: '#7D40E7',
      color: '#fff',
    },
  }),
  menuList: (provided) => ({
    ...provided,

    paddingTop: -20,
    '::-webkit-scrollbar': {
      display: 'none',
    },
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    outline: 'none',

    color: '#7d40e7',
    '&:hover': {
      color: darken(0.2, '#7d40e7'),
    },
  }),
};
