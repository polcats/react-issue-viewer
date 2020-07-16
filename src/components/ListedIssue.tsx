import React from 'react';
import Span from './Span';
import Label from './Label';
import AppModel from '../models/AppModel';

type ListedIssueProps = {
  text: string;
  labels: string[];
  appStore: AppModel;
};

const Issue: React.FC<ListedIssueProps> = ({ text, labels, appStore }) => {
  return (
    <>
      <Span text={text} className="listed-issue" />
      {labels.map((label) => {
        return (
          <Label
            text={label}
            color={appStore.labelStore.getColorForLabel(label)}
          />
        );
      })}
    </>
  );
};
