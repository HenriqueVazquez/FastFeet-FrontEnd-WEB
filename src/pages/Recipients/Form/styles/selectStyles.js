import { darken } from 'polished';

export const customStylesSelectInput = {
  control: (provided) => ({
    ...provided,
    height: 45,
    outline: 'none',

    indicatorsContainer: {
      outline: 'none',
    },
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
    '&:active': {
      backgroundColor: '#7D40d4',
      color: '#fff',
    },
  }),
  menuList: (provided) => ({
    ...provided,
    height: 'auto',
    maxHeight: '100px',
    paddingTop: -20,
    border: 'none',
    outline: 'none',

    '::-webkit-scrollbar': {
      display: 'none',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    paddingLeft: 10,
    outline: 'none',
    color: '#444',
    fontSize: '14px',
    fontFamily: 'Roboto, sans-serif',
  }),
  menuPortal: (provided) => ({
    ...provided,
    outline: 'none',
  }),
  valueContainer: (provided) => ({
    ...provided,
    outline: 'none',
    display: 'flex',

    paddingLeft: 10,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    outline: 'none',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    outline: 'none',

    borderLeft: '1px solid #ddd',
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
