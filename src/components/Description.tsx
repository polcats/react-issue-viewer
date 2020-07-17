import React from 'react';
import DescriptionsModel from '../models/DescriptionsModel';
import Span from './Span';

type DescriptionProps = {
  issueId: number;
  descStore: DescriptionsModel;
};

const Description: React.FC<DescriptionProps> = ({ issueId, descStore }) => {
  let [filtered] = descStore.descriptions.filter(
    (com: any) => com.iid === issueId,
  );

  const HtmlToReactParser = require('html-to-react').Parser;
  return (
    <div className="desc-wrap">
      {descStore.loading ? (
        <Span className="loader" text="Loading descriptions..." />
      ) : (
        new HtmlToReactParser().parse(filtered.html)
      )}
    </div>
  );
};

export default Description;
