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
};

const Label: React.FC<LabelProps> = ({ text }) => {
  //   const getLabelColor = (text: string) => {
  //     return labels?.filter((item) => {
  //       item.name === text;
  //     })[0]?.color;
  //   };

  return <label style={{ color: '#fff', backgroundColor: '#000' }}></label>;
};

export default Label;
