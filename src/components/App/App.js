import React from 'react';
import { Route, Switch } from 'react-router-dom'; // Компоненты для роутинга и редиректа
import './App.css';
import Header from '../Header/Header'; // Шапка
import Main from '../Main/Main'; // Главная страница
import SavedNews from '../SavedNews/SavedNews'; // Сраница сохранённых новостей
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import NotificationPopup from '../NotificationPopup/NotificationPopup'; // Подвал

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginPopupOpened: false,
      isRegisterPopupOpened: false,
      isNotificationPopupOpened: false,
      isSomePopupOpened: false, // Открыт ли хотя бы один попап
    };
  }

  closeAllPopups = () => {
    this.setState({
      isLoginPopupOpened: false,
      isRegisterPopupOpened: false,
      isNotificationPopupOpened: false,
      isSomePopupOpened: false,
    });
  }

  openLoginPopup = () => {
    this.closeAllPopups(); // Закроем все попаппы
    this.setState({
      isLoginPopupOpened: true,
      isSomePopupOpened: true, // Открыт ли хотя бы один попап
    }); // Откроем попап логина
  }

  openRegisterPopup = () => {
    this.closeAllPopups(); // Закроем все попаппы
    this.setState({
      isRegisterPopupOpened: true,
      isSomePopupOpened: true, // Открыт ли хотя бы один попап
    }); // Откроем попап логина
  }

  openNotificationPopup= () => {
    this.closeAllPopups(); // Закроем все попаппы
    this.setState({
      isNotificationPopupOpened: true,
      isSomePopupOpened: true, // Открыт ли хотя бы один попап
    }); // Откроем попап логина
  }

  componentDidMount() {
    this.openLoginPopup();
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path='/'>
            <Header isSomePopupOpened={this.state.isSomePopupOpened} closePopup={this.closeAllPopups} openLoginPopUp={this.openNotificationPopup} theme='theme_contrast' />
            <Main />
            <Footer />
          </Route>
          <Route path='/saved-news'>
            <Header isSomePopupOpened={this.state.isSomePopupOpened} closePopup={this.closeAllPopups} openLoginPopUp={this.openNotificationPopup} />
            <SavedNews />
            <Footer />
          </Route>
        </Switch>
        <LoginPopup changePopup={this.openRegisterPopup} isLoginPopupOpened={this.state.isLoginPopupOpened} close={this.closeAllPopups} />
        <RegisterPopup changePopup={this.openLoginPopup} isRegisterPopupOpened={this.state.isRegisterPopupOpened} close={this.closeAllPopups} />
        <NotificationPopup changePopup={this.openLoginPopup} isNotificationPopupOpened={this.state.isNotificationPopupOpened} close={this.closeAllPopups} />
      </>
    );
  }
}

export default App;
