import React from 'react';
import createAppStore from './store/store';

const appStore = createAppStore();
appStore.getLabels();

// const a = async () => {
//   let projectIssues = JSON.stringify(
//     await api.Issues.all({ projectId: 349, groupId: 120 }),
//   );
//   let data = await JSON.parse(projectIssues);
//   data = data.filter((item: typeof data[0]) => item.closed_at === null);

//   console.log(data);

//   let projectLabels = await api.Labels.all(349);

//   console.log(projectLabels[0]);
// };
// a();

function App() {
  return (
    <div className="App">
      <header className="App-header" />
    </div>
  );
}

export default App;
