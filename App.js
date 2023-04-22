import React from 'react';
import RootNavigation from './components/navigation/RootNavigation';
// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootReducer from './components/storage/RootReducer';
var store= createStore(RootReducer)

function App() {

  return(
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  )
}

export default App;
