import React from 'react';
import ReactDOM from 'react-dom';
import './vendor/normalize.css'; // Подключили normalize.css
import App from './components/App/App'; // Компонент приложения
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
