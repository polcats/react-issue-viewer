import React from 'react';
import { observer } from 'mobx-react-lite';
import Span from '../components/Span';
import Label from '../components/Label';
import AppModel from '../models/AppModel';
import { Markdown } from '@gitbeaker/browser';

type IssueDetailProps = {
  id: number;
  appStore: AppModel;
};

const IssueDetail: React.FC<IssueDetailProps> = ({ id, appStore }) => {
  if (appStore.issueStore.loading) {
    return <Span className="issue-detail loader" text="Loading details..." />;
  }

  let displayIssue = JSON.parse(
    JSON.stringify(
      appStore.issueStore.issues.find((i: any) => {
        return i.iid == id;
      }),
    ),
  );

  return (
    <div id="issue-detail-wrapper">
      <div>
        <h1>{displayIssue.title}</h1>
        <h3>{displayIssue.author.name}</h3>
        <summary>{displayIssue.description}</summary>
        <ul>
          <li>Last modified {displayIssue.updated_at}</li>
          <li>
            Assigned to
            {displayIssue.assignees.map((assignee: any) => ` ${assignee.name}`)}
          </li>
          <li>
            Due Date: {displayIssue.due_date ? displayIssue.due_date : 'None'}
          </li>
          <li>
            Milestone:{' '}
            {displayIssue.milestone ? displayIssue.milestone : 'None'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default observer(IssueDetail);
