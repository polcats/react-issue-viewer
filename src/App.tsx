import React from 'react';
import createAppStore from './store/store';

(async () => {
  const appStore = createAppStore();
  await appStore.getLabels();
  console.log(appStore.getColorForLabel('Bug'));
})();

function App() {
  return (
    <div className="App">
      <header className="App-header" />
    </div>
  );
}

export default App;
