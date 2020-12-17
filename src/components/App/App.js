import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom'; // Компоненты для роутинга и редиректа
import MainApi from '../../utils/MainApi';
import './App.css';
import Header from '../Header/Header'; // Шапка
import Main from '../Main/Main'; // Главная страница
import SavedNews from '../SavedNews/SavedNews'; // Сраница сохранённых новостей
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import NotificationPopup from '../NotificationPopup/NotificationPopup'; // Подвал
import { CurrentUserContext } from '../../contexts/currentUserContext'; // Контекст текущего юзера

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserLogined: false, // Авторизован ли юзер
      currentUser: '', // Текущий пользователь (объект)
      isLoginPopupOpened: false, // Открыт ли попап логина
      isRegisterPopupOpened: false, // Открыт ли попап регистрации
      isNotificationPopupOpened: false, //
      isSomePopupOpened: false, // Открыт ли хотя бы один попап
    };
  }

  // Сделано
  // 1) В формах авторизации и регистрации валидировать поля
  // 1) Передавать ошибку формы в форму
  // 1) При ошибке авторизации рендерить её в инпут авторизации
  // 1) Проверять токен в локалсторадже
  // 1) Проверять состояние авторизации,
  // 2) Если юзер не авторизован, показывать в шапке кнопку авторизации и сохраненные статьи
  // 2) Если юзер не авторизован, не пускать его в сохранённые новости и не показывать

  // TODO:


  // Авторизует пользователя по переданным в JSON данным
  _loginUser = (loginData) => {
    // Возвращаем промис чтобы передать ошибку в форму
    return MainApi.login(loginData)
      .then((responce) => {
        // Если ответ получен, обработали
        if (responce) {
          const { token } = responce;
          // Записали полученный токен в хранилище
          this._saveToken(token);
          // Получили данные юзера по токену
          this._getUserData(token).then((userData) => {
            // Авторизовали юзера
            this._authoriseUser(userData);
            // Закрыли попап если юзер авторизовался
            this.closeAllPopups();
          }).catch((error) => {
            // Отловили ошибку
            console.log(error);
          });
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

        // Если регистрация успешна, показываем уведомление об успехе
        this.openNotificationPopup();
      }).catch((error) => {
        // Возвращаем во внешний обработчик ошибки реджект промиса с ошибкой
        const { message } = error;
        return Promise.reject(new Error(message));
      });
  }

  // Отменяет авторизацию пользователя
  logout = () => {
    this._deleteToken();
    this._unauthoriseUser();
  }

  // Cохраняет данные авторизованного юзера в контекст приложения
  _authoriseUser = (userData) => {
    this.setState({
      currentUser: userData,
      isUserLogined: true,
    });
  }

  // Удаляет данные юзера из приложения и редиректит на главную страницу
  _unauthoriseUser = () => {
    this.setState({
      currentUser: '',
      isUserLogined: false,
    });
  }

  // Получает данные пользователя из апи
  _getUserData = (token) => {
    // Запросили данные по апи
    return MainApi.getUserData(token);
  }

  // Проверяет токен и в случае его корректности авторизует юзера
  _checkUserToken = () => {
    // Прочитали токен
    const token = this._readToken();

    if (token) {
      // Отправили токен по апи
      this._getUserData(token)
        .then((userData) => {
          // Авторизовали юзера в случае успеха
          this._authoriseUser(userData);
        })
        .catch((error) => {
          // Если токена нет, или авторизация не удалась
          // Меняем состояние на неавторизованнное
          this._unauthoriseUser();
          // Удаляем токен, если он есть
          this._deleteToken();
        });
    }
    // Если токена нет, ничего не делаем
  }

  // Записать токен в localstorage
  _saveToken = (token) => {
    localStorage.setItem('token', token);
  }

  // Получить токен из localstorage
  _readToken = () => {
    return localStorage.getItem('token');
  }

  // Удалить токен из localstorage
  _deleteToken = () => {
    localStorage.removeItem('token');
  }

  // Закрывает все окна
  closeAllPopups = () => {
    this.setState({
      isLoginPopupOpened: false,
      isRegisterPopupOpened: false,
      isNotificationPopupOpened: false,
      isSomePopupOpened: false,
    });
  }

  // Открывает окно авторизации
  openLoginPopup = () => {
    this.closeAllPopups(); // Закроем все попаппы
    this.setState({
      isLoginPopupOpened: true,
      isSomePopupOpened: true, // Открыт ли хотя бы один попап
    }); // Откроем попап логина
  }

  // Открывает окно регистрации
  openRegisterPopup = () => {
    this.closeAllPopups(); // Закроем все попаппы
    this.setState({
      isRegisterPopupOpened: true,
      isSomePopupOpened: true, // Открыт ли хотя бы один попап
    }); // Откроем попап логина
  }

  // Открывает окно нотификейшена
  openNotificationPopup = () => {
    this.closeAllPopups(); // Закроем все попаппы
    this.setState({
      isNotificationPopupOpened: true,
      isSomePopupOpened: true, // Открыт ли хотя бы один попап
    }); // Откроем попап логина
  }

  componentDidMount() {
    this._checkUserToken();
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Switch>
          <Route exact path='/'>
            <Header isSomePopupOpened={this.state.isSomePopupOpened} closePopup={this.closeAllPopups} logout={this.logout} openLoginPopUp={this.openLoginPopup} theme='theme_contrast' />
            <Main />
            <Footer />
          </Route>
          <Route path='/saved-news'>
            <Header isSomePopupOpened={this.state.isSomePopupOpened} closePopup={this.closeAllPopups} logout={this.logout} openLoginPopUp={this.openLoginPopup} />
            <SavedNews />
            <Footer />
          </Route>
        </Switch>
        <LoginPopup changePopup={this.openRegisterPopup} isLoginPopupOpened={this.state.isLoginPopupOpened} close={this.closeAllPopups} onSubmit={this._loginUser} />
        <RegisterPopup changePopup={this.openLoginPopup} isRegisterPopupOpened={this.state.isRegisterPopupOpened} close={this.closeAllPopups} onSubmit={this._registerUser}/>
        <NotificationPopup changePopup={this.openLoginPopup} isNotificationPopupOpened={this.state.isNotificationPopupOpened} close={this.closeAllPopups} />
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
