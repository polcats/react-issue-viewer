import React from 'react';
import { observer } from 'mobx-react-lite';
import Span from '../components/Span';
import AppModel from '../models/AppModel';
import ListedIssue from '../components/ListedIssue';

type IssuesPanelProps = {
  appStore: AppModel;
};

const IssuesPanel: React.FC<IssuesPanelProps> = ({ appStore }) => {
  return (
    <>
      {appStore.issueStore.loading ? (
        <Span className="issue loader" text="Loading issues..." />
      ) : (
        <>
          {appStore.issueStore.issues.map((issue) => {
            return (
              <ListedIssue
                text={issue.text}
                labels={issue.labels}
                appStore={appStore}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default observer(IssuesPanel);
