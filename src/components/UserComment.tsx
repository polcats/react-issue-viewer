import React from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import Span from '../components/Span';

type UserCommentProps = {
  notes: any[];
};

const UserComment: React.FC<UserCommentProps> = ({ notes }) => {
  return (
    <>
      {notes.map((note, key) => {
        return (
          <div className="user-comment" key={key}>
            <img
              className="user-avatar"
              src={note.author.avatar_url}
              alt={note.author.name}
            />
            <div className="comment-data">
              <Span className="user-name" text={note.author.name} />
              <Span
                className="time-posted"
                text={moment(note.updated_at).fromNow()}
                title={note.updated_at}
              />
              <Span className="comment-text" text={note.body} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default observer(UserComment);
