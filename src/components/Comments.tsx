import React from 'react';
import CommentsModel from '../models/CommentsModel';
import UserComment from '../components/UserComment';

type CommentsProps = {
  issueId: number;
  commentStore: CommentsModel;
};

const Comments: React.FC<CommentsProps> = ({ issueId, commentStore }) => {
  if (commentStore.loading) {
    return <>Loading...</>;
  }

  const commentsForIssue = JSON.parse(JSON.stringify(commentStore.comments));
  let [filtered] = commentsForIssue.filter((com: any) => com.iid === issueId);

  return (
    <>
      <h1>Comments ({filtered.data.length})</h1>
      {filtered.data.map((data: any, key: number) => {
        return <UserComment key={key} notes={data.notes} />;
      })}
    </>
  );
};

export default Comments;
