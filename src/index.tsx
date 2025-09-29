import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-quill/dist/quill.snow.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

if (process.env.NODE_ENV === 'production') {
  root.render(
    <React.StrictMode>
      {app}
    </React.StrictMode>
  );
} else {
  root.render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
