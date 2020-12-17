import React from 'react';
import { Route, Switch } from 'react-router-dom'; // Компоненты для роутинга и редиректа
import MainApi from '../../utils/MainApi';
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
      isUserLogined: false, // Авторизован ли юзер
      isLoginPopupOpened: false, // Открыт ли попап логина
      isRegisterPopupOpened: false, // Открыт ли попап регистрации
      isNotificationPopupOpened: false, //
      isSomePopupOpened: false, // Открыт ли хотя бы один попап
    };
  }

  // Сделано
  // 1) В формах авторизации и регистрации валидировать поля

  // TODO:
  // 1) Проверять состояние авторизации,
  // 1) Передавать ошибку формы в форму
  // 2) Если юзер не авторизован, показывать в шапке кнопку авторизации
  // 2) Если юзер не авторизован, не пускать его в сохранённые новости
  // 4) При ошибке авторизации рендерить её в инпут авторизации

  // Авторизует пользователя по переданным в JSON данным
  _loginUser = (userData) => {
    // Возвращаем промис чтобы передать ошибку в форму
    return MainApi.login(userData)
      .then((responce) => {
        // Если ответ получен, обработали
        if (responce) {
          console.log(responce);
        }
      }).catch((error) => {
        // Возвращаем во внешний обработчик ошибки реджект промиса с ошибкой
        const { message } = error;
        return Promise.reject(new Error(message));
      });
  }

  // Регистрирует пользователя по переданным в JSON данным
  _registerUser = (userData) => {
    return MainApi.register(userData)
      .then((responce) => {
        // Если ответ получен, обработали
        if (responce) {
          console.log(responce);
        }
      }).catch((error) => {
        // Возвращаем во внешний обработчик ошибки реджект промиса с ошибкой
        const { message } = error;
        return Promise.reject(new Error(message));
      });
  }

  _checkToken = () => {
    // Проверить наличие токена
  }

  _getToken = () => {
    // Получить токен
  }

  _saveToken = () => {
    // Записать токен в localstorage
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

  openNotificationPopup = () => {
    this.closeAllPopups(); // Закроем все попаппы
    this.setState({
      isNotificationPopupOpened: true,
      isSomePopupOpened: true, // Открыт ли хотя бы один попап
    }); // Откроем попап логина
  }

  componentDidMount() {
    this.openRegisterPopup();
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
        <LoginPopup changePopup={this.openRegisterPopup} isLoginPopupOpened={this.state.isLoginPopupOpened} close={this.closeAllPopups} onSubmit={this._loginUser} />
        <RegisterPopup changePopup={this.openLoginPopup} isRegisterPopupOpened={this.state.isRegisterPopupOpened} close={this.closeAllPopups} onSubmit={this._registerUser}/>
        <NotificationPopup changePopup={this.openLoginPopup} isNotificationPopupOpened={this.state.isNotificationPopupOpened} close={this.closeAllPopups} />
      </>
    );
  }
}

export default App;
