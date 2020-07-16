import React from 'react';

export type LabelApiProps = {
  id: number;
  name: string;
  color: string;
  description: string;
  description_html: string;
};

type LabelProps = {
  id: number;
  text: string;
  color: string;
};

const Label: React.FC<LabelProps> = ({ text, color, id }) => {
  return (
    <label
      style={{
        color: '#fff',
        backgroundColor: color,
      }}
    >
      {text}
    </label>
  );
};

export default Label;
