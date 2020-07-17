import React from 'react';
import { observer } from 'mobx-react-lite';
import CommentsModel from '../models/CommentsModel';
import UserComment from '../components/UserComment';
import loader from '../loader.gif';

type CommentsProps = {
  issueId: number;
  commentStore: CommentsModel;
};

const Comments: React.FC<CommentsProps> = ({ issueId, commentStore }) => {
  let [filtered] = commentStore.comments.filter(
    (com: any) => com.iid === issueId,
  );

  return (
    <>
      {commentStore.loading ? (
        <>
          <h1>Comments (..)</h1>
          <img src={loader} alt="Loading..." />
        </>
      ) : (
        <>
          <h1>Comments ({filtered.data.length})</h1>
          {filtered.data.map((data: any, key: number) => {
            return <UserComment key={key} notes={data.notes} />;
          })}
        </>
      )}
    </>
  );
};

export default observer(Comments);
