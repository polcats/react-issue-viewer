import React from 'react';

type SpanProps = {
  className?: string;
  text: string;
  title?: string;
};

const Span: React.FC<SpanProps> = ({ className, text, title }) => {
  return (
    <span className={className} title={title}>
      {text}
    </span>
  );
};

export default Span;
