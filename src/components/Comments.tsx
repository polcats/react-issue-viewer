import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { appContext } from '../models/AppModel';
import UserComment from '../components/UserComment';
import loader from '../loader.gif';

type CommentsProps = {
  issueId: number;
};

const Comments: React.FC<CommentsProps> = ({ issueId }) => {
  const appStore = useContext(appContext);

  if (appStore.commentStore.loading) {
    return (
      <>
        <h1>Comments (..)</h1>
        <img src={loader} alt="Loading..." />
      </>
    );
  }

  const comments = JSON.parse(
    JSON.stringify(appStore.commentStore.items.get(issueId)),
  );

  return (
    <>
      <h1>Comments ({comments.length})</h1>
      {comments.map((comment: any, key: number) => {
        return <UserComment key={key} notes={comment.notes} />;
      })}
    </>
  );
};

export default observer(Comments);
