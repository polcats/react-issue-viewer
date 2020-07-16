import React from 'react';
import { Gitlab } from '@gitbeaker/browser';

const api = new Gitlab({
  host: 'https://gitlab.icannhas.com/',
  token: '2syhQoC3hVxWvVyZueHH',
});

const a = async () => {
  let test = await api.Projects.search('WebRTC');
  console.log(test);
};
a();

function App() {
  return (
    <div className="App">
      <header className="App-header" />
    </div>
  );
}

export default App;
