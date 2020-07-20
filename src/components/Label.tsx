import React from 'react';

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
