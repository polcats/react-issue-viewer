import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { appContext } from '../models/App';
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
        Array.from(appStore.issueStore.items).map((issue, key) => {
          return (
            <ListedIssue
              key={key}
              issueId={issue[1].iid}
              title={issue[1].title}
              labels={issue[1].labels}
            />
          );
        })
      )}
    </aside>
  );
};

export default observer(IssuesPanel);
