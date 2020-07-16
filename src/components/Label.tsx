import React from 'react';
import LabelsModel from '../models/LabelsModel';

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
    ></label>
  );
};

export default Label;
