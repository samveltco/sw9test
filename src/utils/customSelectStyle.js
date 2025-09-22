// ©2024 Austin App House. All rights reserved.
export const white = {
  control: provided => ({
    ...provided,
    color: 'black',
    borderRadius: 'none',
  }),
  menu: (provided, state) => ({
    ...provided,
    color: 'black',
    borderRadius: 'none',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    color: 'black',
  }),
  container: (base) => ({
    ...base,
    width: '100%',
  })
};

export const blueDark = {
  singleValue: styles => ({
    ...styles,
    color: 'white',
  }),
  control: styles => ({
    ...styles,
    backgroundColor: '#1e2f41',
    borderColor: '#1e2f41',
  }),
  option: (styles, {data, isDisabled, isFocused, isSelected}) => {
    return {
      ...styles,
      fontWeight: isFocused ? 'bold' : 'normal',
      backgroundColor: isSelected ? '#e6e3e3' : 'white',
      color: '#000000',
    };
  },
};

export const dark = {
  input: styles => ({
    ...styles,
    color: 'white',
  }),
  placeholder: styles => ({
    ...styles,
    color: 'white',
  }),
  singleValue: styles => ({
    ...styles,
    color: 'white',
  }),
  control: styles => ({
    ...styles,
    backgroundColor: '#182837',
    borderColor: '#182837',
    borderRadius: 'none',
  }),
  option: (styles, {data, isDisabled, isFocused, isSelected}) => {
    return {
      ...styles,
      fontWeight: isFocused ? 'bold' : 'normal',
      color: '#000000',
    };
  },
};

export default ({
  white,
  dark,
  blueDark,
})
