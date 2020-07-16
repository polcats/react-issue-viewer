import React from 'react';

type LabelApiProps = {
  id: number;
  name: string;
  color: string;
  description: string;
  description_html: string;
};

type LabelProps = {
  text: string;
  labels: LabelApiProps[];
};

const Label: React.FC<LabelProps> = ({ text, labels }) => {
  const getLabelColor = (text: string) => {
    return labels?.filter((item) => {
      item.name === text;
    })[0]?.color;
  };

  return (
    <label
      style={{ color: '#fff', backgroundColor: getLabelColor(text) }}
    ></label>
  );
};
