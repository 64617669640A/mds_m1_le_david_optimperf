import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import TodoApp from './TodoApp';

ReactDOM.render(
  <Provider store={configureStore()}>
    <TodoApp />
  </Provider>,
  document.getElementById('root'),
);
