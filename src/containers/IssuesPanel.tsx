import React from 'react';
import { observer } from 'mobx-react-lite';
import Span from '../components/Span';
import AppModel from '../models/AppModel';
import ListedIssue from '../components/ListedIssue';

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
            <Span className="issues loader" text="Loading issues..." />
          ) : (
            appStore.issueStore.issues.map((issue, key) => {
              return (
                <ListedIssue
                  key={key}
                  id={issue.iid}
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
