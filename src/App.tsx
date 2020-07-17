import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import AppModel from './models/AppModel';
import IssuesPanel from './containers/IssuesPanel';
import IssueDetail from './containers/IssueDetail';
import './App.css';

type AppProps = {
  appStore: AppModel;
};

const App: React.FC<AppProps> = ({ appStore }) => {
  const isFullView = useMediaQuery({
    query: '(min-device-width: 1024px)',
  });

  return (
    <BrowserRouter>
      <div className={`layout-wrapper ${isFullView ? 'full' : 'small'}`}>
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
              <main
                className={`with-bg ${isFullView ? 'full' : 'small'}`}
              ></main>
            )}
          </Route>
          <Route
            exact
            path="/issue/:id"
            render={(props) => {
              return (
                <main className={isFullView ? 'full' : 'small'}>
                  <IssueDetail
                    issueId={parseInt(props.match.params.id, 10)}
                    appStore={appStore}
                  />
                </main>
              );
            }}
          />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default observer(App);
