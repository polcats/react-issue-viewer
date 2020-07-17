import React from 'react';
import { observer } from 'mobx-react-lite';
import AppModel from '../models/AppModel';
import ListedIssue from '../components/ListedIssue';
import loader from '../loader.gif';

type IssuesPanelProps = {
  isFull: boolean;
  appStore: AppModel;
};

const IssuesPanel: React.FC<IssuesPanelProps> = ({ isFull, appStore }) => {
  return (
    <aside className={isFull ? 'full' : 'small'}>
      {
        <>
          {appStore.issueStore.loading ? (
            <img src={loader} alt="Loading..." />
          ) : (
            appStore.issueStore.issues.map((issue, key) => {
              return (
                <ListedIssue
                  key={key}
                  issueId={issue.iid}
                  title={issue.title}
                  labels={issue.labels}
                  appStore={appStore}
                />
              );
            })
          )}
        </>
      }
    </aside>
  );
};

export default observer(IssuesPanel);
