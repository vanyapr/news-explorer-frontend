import React from 'react';
import ReactDOM from 'react-dom';
import './vendor/normalize.css'; // Подключили normalize.css
import App from './components/App/App'; // Компонент приложения

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
