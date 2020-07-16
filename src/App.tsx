import React from 'react';
import { ProjectsBundle } from '@gitbeaker/browser';

const api = new ProjectsBundle({
  host: 'https://gitlab.icannhas.com/',
  token: '2syhQoC3hVxWvVyZueHH',
});

const a = async () => {
  let projectIssues = JSON.stringify(
    await api.Issues.all({ projectId: 349, groupId: 120 }),
  );
  let data = await JSON.parse(projectIssues);
  data = data.filter((item: typeof data[0]) => item.closed_at === null);

  console.log(data);
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
