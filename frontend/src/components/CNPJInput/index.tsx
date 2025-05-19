import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export const CNPJInput: React.FC<TextFieldProps> = (props) => {
  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCNPJ(event.target.value);
    if (props.onChange) {
      props.onChange({
        ...event,
        target: {
          ...event.target,
          value: formattedValue,
        },
      });
    }
  };

  return (
    <TextField
      {...props}
      onChange={handleChange}
      inputProps={{
        ...props.inputProps,
        maxLength: 18,
      }}
    />
  );
}; 