import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AppModel from '../models/AppModel';
import Span from './Span';
import Label from './Label';

type ListedIssueProps = {
  issueId: number;
  title: string;
  labels: string[];
  appStore: AppModel;
};

const ListedIssue: React.FC<ListedIssueProps> = ({
  issueId,
  title,
  labels,
  appStore,
}) => {
  return (
    <div className="list-issue-wrapper">
      <Link to={`/issue/${issueId}`}>
        <Span text={title} className="listed-issue" />
      </Link>
      {appStore.labelStore.loading ? (
        <Span className="label loader" text="Loading labels..." />
      ) : (
        labels.map((label, key) => {
          return (
            <Label
              key={key}
              text={label}
              color={appStore.labelStore.getColorForLabel(label)}
            />
          );
        })
      )}
    </div>
  );
};

export default observer(ListedIssue);
