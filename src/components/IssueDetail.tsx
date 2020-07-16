import React from 'react';
import { observer } from 'mobx-react-lite';
import Span from './Span';
import Label from './Label';
import AppModel from '../models/AppModel';

type IssueDetailProps = {
  id: number;
  appStore: AppModel;
};

const IssueDetail: React.FC<IssueDetailProps> = ({ id, appStore }) => {
  const [displayIssue] = appStore.issueStore.issues.filter(
    (issue) => issue.id === id,
  );

  return (
    <div id="issue-detail-wrapper">
      {appStore.issueStore.loading ? (
        <Span className="issue-detail loader" text="Loading details..." />
      ) : (
        <div>
          <h1>{displayIssue.title}</h1>
          <h3>created by {displayIssue.author}</h3>
          <summary>{displayIssue.description}</summary>
          <ul>
            <li>Last modified: {displayIssue.updated_at}</li>
            <li>
              Assigned to:{' '}
              {displayIssue.assignees.map(
                (assignee: any) => ` ${assignee.name}`,
              )}
            </li>
            <li>Due Date: {displayIssue.due_date}</li> // TODO
            <li>
              Milestones:
              {displayIssue.milestone ? 'Milestone placeholder' : 'None'}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
