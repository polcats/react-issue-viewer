import React from 'react';
import Span from './Span';
import Label from './Label';

type IssueProps = {
  text: string;
  labels: string[];
};

const Issue: React.FC<IssueProps> = ({ text, labels }) => {
  return (
    <>
      <Span text={text} className="listed-issue" />
      {labels.map((label) => {
        return <Label text={label} />;
      })}
    </>
  );
};
