import React from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import AppModel from '../models/AppModel';
import Comment from '../components/Comments';
import Description from '../components/Description';
import Label from '../components/Label';
import Span from '../components/Span';
import loader from '../loader.gif';

type IssueDetailProps = {
  issueId: number;
  appStore: AppModel;
};

const IssueDetail: React.FC<IssueDetailProps> = ({ issueId, appStore }) => {
  if (appStore.issueStore.loading) {
    return <img src={loader} alt="Loading..." />;
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
    <Span
      className="issue-detail loader"
      text="Requested issue is not found."
    />
  ) : (
    <div id="issue-wrapper">
      <div className="issue-details">
        <input
          type="button"
          value="Back"
          onClick={() => {
            window.history.back();
          }}
        />
        <h1 className="issue-title">
          <Span text={displayIssue.title} />
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
        <ul>
          <li>
            <Span className="issue-tag" text="Last modified:" />
            <Span
              className="issue-tag-pair"
              text={moment(displayIssue.updated_at).fromNow()}
            />
          </li>
          <li>
            <Span className="issue-tag" text="Author:" />
            <Span className="issue-name" text={displayIssue.author.name} />
          </li>
          <li>
            <Span className="issue-tag" text="Assigned to:" />
            <Span
              className="issue-name"
              text={
                displayIssue.assignees.length === 0
                  ? 'None'
                  : displayIssue.assignees.map(
                      (assignee: any) => ` ${assignee.name}`,
                    )
              }
            />
          </li>
          <li>
            <Span className="issue-tag" text="Due Date:" />
            <Span
              className="issue-tag-pair"
              text={displayIssue.due_date ? displayIssue.due_date : 'None'}
            />
          </li>
          <li>
            <Span className="issue-tag" text="Milestone:" />
            <Span
              className="issue-tag-pair"
              text={displayIssue.milestone ? displayIssue.milestone : 'None'}
            />
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
