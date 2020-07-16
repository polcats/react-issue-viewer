import React from 'react';
import { observer } from 'mobx-react-lite';
import Span from './Span';
import Label from './Label';
import AppModel from '../models/AppModel';

type ListedIssueProps = {
  text: string;
  labels: string[];
  appStore: AppModel;
};

const ListedIssue: React.FC<ListedIssueProps> = ({
  text,
  labels,
  appStore,
}) => {
  return (
    <>
      <Span text={text} className="listed-issue" />
      {appStore.labelStore.loading ? (
        <Span className="label loader" text="Loading labels..." />
      ) : (
        labels.map((label) => {
          return (
            <Label
              text={label}
              color={appStore.labelStore.getColorForLabel(label)}
            />
          );
        })
      )}
    </>
  );
};

export default observer(ListedIssue);
