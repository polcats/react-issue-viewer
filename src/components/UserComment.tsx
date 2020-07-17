import React from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { NoteAPIProps } from '../api/CommentAPITypes';
import Span from '../components/Span';

type UserCommentProps = {
  notes: NoteAPIProps[];
};

const UserComment: React.FC<UserCommentProps> = ({ notes }) => {
  const HtmlToReactParser = require('html-to-react').Parser;
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
              <div className="comment-text">
                {new HtmlToReactParser().parse(note.body)}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default observer(UserComment);
