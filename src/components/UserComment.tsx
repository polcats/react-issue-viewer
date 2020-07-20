import React from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { Note } from '../models/Comment';
import Span from '../components/Span';

type UserCommentProps = {
  notes: Note[];
};

const UserComment: React.FC<UserCommentProps> = ({ notes }) => {
  const HtmlToReactParser = require('html-to-react').Parser;

  console.log(notes);

  return (
    <>
      {notes.map((note, key) => {
        console.log(key);
        return (
          <div className={`user-comment ${key > 0 ? 'nested' : ''}`} key={key}>
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
