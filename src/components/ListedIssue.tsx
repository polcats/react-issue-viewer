import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Span from './Span';
import Label from './Label';
import AppModel from '../models/AppModel';

type ListedIssueProps = {
  id: number;
  title: string;
  labels: string[];
  appStore: AppModel;
};

const ListedIssue: React.FC<ListedIssueProps> = ({
  id,
  title,
  labels,
  appStore,
}) => {
  return (
    <div className="list-issue-wrapper">
      <Link to={`/issue/${id}`}>
        <Span text={title} className="listed-issue" />
      </Link>
      {appStore.labelStore.loading ? (
        <Span className="label loader" text="Loading labels..." />
      ) : (
        labels.map((label, key) => {
          return (
            <Label
              id={id}
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
