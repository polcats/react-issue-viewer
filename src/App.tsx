import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import IssuesPanel from './containers/IssuesPanel';
import IssueDetail from './containers/IssueDetail';
import './App.css';

const App: React.FC = () => {
  const isFullView = useMediaQuery({
    query: '(min-device-width: 1024px)',
  });

  return (
    <BrowserRouter>
      <div className={`layout-wrapper ${isFullView ? 'full' : 'small'}`}>
        <h1 className="head">
          <Link to="/">WebRTC Issue Viewer</Link>
        </h1>
        {isFullView && <IssuesPanel isFull={isFullView} />}
        <Switch>
          <Route exact path="/">
            {!isFullView && <IssuesPanel isFull={isFullView} />}
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
                  <IssueDetail issueId={parseInt(props.match.params.id, 10)} />
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
