import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import IssuesPanel from './containers/IssuesPanel';
import IssueDetail from './containers/IssueDetail';
import './App.css';
import AppModel from './models/AppModel';

type AppProps = {
  appStore: AppModel;
};

const App: React.FC<AppProps> = ({ appStore }) => {
  const isFullView = useMediaQuery({
    query: '(min-device-width: 1024px)',
  });

  console.log(isFullView);

  return (
    <BrowserRouter>
      <h1 className="head">
        <Link to="/">WebRTC Issue Viewer</Link>
      </h1>

      {isFullView && <IssuesPanel appStore={appStore} isFull={isFullView} />}
      <Switch>
        <Route exact path="/">
          {!isFullView && (
            <IssuesPanel appStore={appStore} isFull={isFullView} />
          )}
          {isFullView && (
            <main className={`${isFullView ? 'full' : 'small'} with-bg`}></main>
          )}
        </Route>
        <Route
          exact
          path="/issue/:id"
          render={(props) => {
            return (
              <main className={isFullView ? 'full' : 'small'}>
                <IssueDetail id={props.match.params.id} appStore={appStore} />
              </main>
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default observer(App);
