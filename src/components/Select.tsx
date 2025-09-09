import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ ...props }) => {
  return (
    <Select
      classNames={{
        control: () => 'select_control',
        menu: () => 'select_menu',
        menuList: () => 'select_menu_list',
        option: () => 'select_option',
        singleValue: () => 'select_single_value',
        placeholder: () => 'select_placeholder',
        valueContainer: () => 'select_value_container',
        input: () => 'select_input',
      }}
      {...props}
    />);
};

export default CustomSelect;

