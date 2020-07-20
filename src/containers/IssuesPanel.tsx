import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { appContext } from '../models/AppModel';
import ListedIssue from '../components/ListedIssue';
import loader from '../loader.gif';

type IssuesPanelProps = {
  isFull: boolean;
};

const IssuesPanel: React.FC<IssuesPanelProps> = ({ isFull }) => {
  const appStore = useContext(appContext);

  return (
    <aside className={isFull ? 'full' : 'small'}>
      {appStore.issueStore.loading ? (
        <img src={loader} className="loader" alt="Loading..." />
      ) : (
        appStore.issueStore.issues.map((issue, key) => {
          return (
            <ListedIssue
              key={key}
              issueId={issue.iid}
              title={issue.title}
              labels={issue.labels}
            />
          );
        })
      )}
    </aside>
  );
};

export default observer(IssuesPanel);
