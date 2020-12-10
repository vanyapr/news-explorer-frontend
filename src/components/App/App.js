import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'; // Компоненты для роутинга и редиректа
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main'; // Главная страница
import SavedNews from '../SavedNews/SavedNews'; // Сраница сохранённых новостей

class App extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path='/'>
            <Header theme='theme_contrast' />
            <Main />
          </Route>
          <Route path='/saved-news'>
            <Header />
            <SavedNews />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
