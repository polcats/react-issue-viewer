import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { appContext } from '../models/AppModel';
import loader from '../loader.gif';

type DescriptionProps = {
  issueId: number;
};

const Description: React.FC<DescriptionProps> = ({ issueId }) => {
  const appStore = useContext(appContext);

  if (appStore.descStore.loading) {
    return <img src={loader} alt="Loading..." />;
  }

  const desc = appStore.descStore.items.get(issueId);
  const HtmlToReactParser = require('html-to-react').Parser;
  return <div className="desc-wrap">{new HtmlToReactParser().parse(desc)}</div>;
};

export default observer(Description);
