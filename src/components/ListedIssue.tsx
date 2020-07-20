import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { appContext } from '../models/App';
import Span from './Span';
import Label from './Label';
import loader from '../loader.gif';

type ListedIssueProps = {
  issueId: number;
  title: string;
  labels: string[];
};

const ListedIssue: React.FC<ListedIssueProps> = ({
  issueId,
  title,
  labels,
}) => {
  const appStore = useContext(appContext);
  return (
    <div className="list-issue-wrapper">
      <Link to={`/issue/${issueId}`}>
        <Span text={title} className="listed-issue" />
      </Link>
      {appStore.labelStore.loading ? (
        <img src={loader} alt="Loading..." />
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
