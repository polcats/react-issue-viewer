import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import IssuesPanel from './containers/IssuesPanel';
import IssueDetail from './containers/IssueDetail';
import './App.css';
import AppModel from './models/AppModel';

type AppProps = {
  appStore: AppModel;
};

const App: React.FC<AppProps> = ({ appStore }) => {
  return (
    <BrowserRouter>
      <IssuesPanel appStore={appStore} />
      <Switch>
        <Route exact path="/">
          <main className="with-bg"></main>
        </Route>
        <Route
          exact
          path="/issue/:id"
          render={(props) => {
            return (
              <main>
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
