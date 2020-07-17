import React from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import Span from '../components/Span';
import Label from '../components/Label';
import Comment from '../components/Comments';
import Description from '../components/Description';
import AppModel from '../models/AppModel';

type IssueDetailProps = {
  issueId: number;
  appStore: AppModel;
};

const IssueDetail: React.FC<IssueDetailProps> = ({ issueId, appStore }) => {
  if (appStore.issueStore.loading) {
    return <Span className="issue-detail loader" text="Loading details..." />;
  }

  let displayIssue;
  try {
    displayIssue = JSON.parse(
      JSON.stringify(
        appStore.issueStore.issues.find((i: any) => {
          return i.iid === issueId;
        }),
      ),
    );
  } catch (e) {}

  return displayIssue === undefined ? (
    <h1>The issue you requested cannot be found.</h1>
  ) : (
    <div id="issue-wrapper">
      <div className="issue-details">
        <h1 className="issue-title">
          <input
            type="button"
            value="Back"
            onClick={() => {
              window.history.back();
            }}
          />{' '}
          {displayIssue.title}
        </h1>
        {displayIssue.labels.map((label: any, key: number) => {
          return (
            <Label
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
        <Description
          descStore={appStore.issueStore.descStore}
          issueId={issueId}
        />
      </div>
      <div className="issue-comments">
        <Comment
          commentStore={appStore.issueStore.commentStore}
          issueId={issueId}
        />
      </div>
    </div>
  );
};

export default observer(IssueDetail);
