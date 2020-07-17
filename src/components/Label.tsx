import React from 'react';

export type LabelApiProps = {
  id: number;
  name: string;
  color: string;
  description: string;
  description_html: string;
};

type LabelProps = {
  text: string;
  color: string;
};

const Label: React.FC<LabelProps> = ({ text, color }) => {
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
