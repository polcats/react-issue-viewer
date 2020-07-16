import React from 'react';

type SpanProps = {
  className: string;
  text: string;
};

const Span: React.FC<SpanProps> = ({ className, text }) => {
  return <span className={className}>{text}</span>;
};

export default Span;
