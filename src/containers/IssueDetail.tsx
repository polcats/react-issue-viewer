import React from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import Span from '../components/Span';
import Label from '../components/Label';
import Comment from '../components/Comments';
import AppModel from '../models/AppModel';

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
        return i.iid == new String(id);
      }),
    ),
  );

  return (
    <div id="issue-wrapper">
      <div className="issue-details">
        <h1>{displayIssue.title}</h1>
        {displayIssue.labels.map((label: any, key: number) => {
          return (
            <Label
              id={id}
              key={key}
              text={label}
              color={appStore.labelStore.getColorForLabel(label)}
            />
          );
        })}
        <h3>Author: {displayIssue.author.name}</h3>
        <ul>
          <li>Last modified {moment(displayIssue.updated_at).fromNow()}</li>
          <li>
            Assigned to:
            {displayIssue.assignees.length === 0
              ? 'None'
              : displayIssue.assignees.map(
                  (assignee: any) => ` ${assignee.name}`,
                )}
          </li>
          <li>
            Due Date: {displayIssue.due_date ? displayIssue.due_date : 'None'}
          </li>
          <li>
            Milestone:{' '}
            {displayIssue.milestone ? displayIssue.milestone : 'None'}
          </li>
        </ul>
        <summary>{displayIssue.description}</summary>
      </div>
      <div className="issue-comments">
        <Comment commentStore={appStore.issueStore.commentStore} issueId={id} />
      </div>
    </div>
  );
};

export default observer(IssueDetail);
