import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'; // Компоненты для роутинга и редиректа
import MainApi from '../../utils/MainApi'; // Основное апи
import NewsApi from '../../utils/NewsApi'; // Апи новостей
import './App.css';
import Header from '../Header/Header'; // Шапка
import Main from '../Main/Main'; // Главная страница
import SavedNews from '../SavedNews/SavedNews'; // Сраница сохранённых новостей
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import NotificationPopup from '../NotificationPopup/NotificationPopup'; // Подвал
import { CurrentUserContext } from '../../contexts/currentUserContext'; // Контекст текущего юзера
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // Защищённый роут

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserLogined: false, // Авторизован ли юзер
      currentUser: {}, // Текущий пользователь (объект)
      isLoginPopupOpened: false, // Открыт ли попап логина
      isRegisterPopupOpened: false, // Открыт ли попап регистрации
      isNotificationPopupOpened: false, //
      isSomePopupOpened: false, // Открыт ли хотя бы один попап
      isLoadSpinnerVisible: false, // Видим ли спиннер "идёт поиск новостей"
      isSearchErrorVisible: false, // Видима ли ошибка поиска
      searchErrorHeading: '', // Заголовок ошибки поиска
      searchErrorText: '', // Текст ошибки поиска
      isShowMoreButtonVisible: false,
      isShowMoreButtonActive: false,
      isSearchResultVisible: false, // Виден ли блок результатов поиска
      foundNews: [], // Список найденных новостей
      newsList: [], // Список новостей для показа
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
  // 1) Зашитить роут /saved-news редиректом
  // 1) После логаута редиректить на /
  // 1. Подключение по апи
  // 1) Поиск статей

  // TODO:
  // 1) По 3 штуки рендерим на главной
  // 1. Число сохранённых статей
  // 1. Ключевые слова сохранённых статей
  // 1) Добавление статьи в избранное
  // 1) Удаление статьи из избранного
  // 1) Обернуть компоненты в чистый компонент
  // 1) При нажатии на иконку сохранения статьи неавторизованным пользователем открывается модальное окно с предложением зарегистрироваться

  // FIXME
  // 1) Когда редиректим из /saved-news неавторизованного юзера на страницу /
  // - надо открывать попап авторизации:
  // - когда юзер открывает роут
  // - проверить авторизацию
  // - если не авторизован
  // - открыть попап

  // Авторизует пользователя по переданным в JSON данным
  loginUser = (loginData) => {
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
  registerUser = (userData) => {
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
  logoutUser = () => {
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
    }, () => {
      this.props.history.push('/');
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
          // Удаляем токен, если он есть, но не прошел проверку
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

  // Обрабатывает сабмит формы поиска новостей, принимает строку поиска
  handleSearchSubmit = (searchString) => {
    // TODO:
    // + Показать лоадер
    // + Выполнить запрос
    // + Скрыть лоадер
    // + В случае ошибки показать ошибку
    // + Показать блок "Результаты поиска"
    // Если новости найдены, показать кнопку "ещё"
    // Когда все карточки отрисованы, кнопка «Показать ещё» должна пропасть.

    this.setState({
      // Показали результаты поиска
      isSearchResultVisible: true,
      isSearchErrorVisible: false,
      isLoadSpinnerVisible: true,
      isShowMoreButtonVisible: false,
      // Очистили текущий список карточек
      newsList: [],
      foundNews: [],
    }, () => {
      NewsApi.getNewsBySearchString(searchString)
        .then((news) => {
          if (news.totalResults === 0) {
            // Показали ошибку поиска
            this.setState({
              isLoadSpinnerVisible: false,
              isSearchErrorVisible: true,
              isShowMoreButtonVisible: false,
              searchErrorHeading: 'Ничего не найдено',
              searchErrorText: 'К сожалению по вашему запросу ничего не найдено.',
            });
          } else {
            // Скрыли ошибку поиска
            this.setState({
              // Если новости найдены, спиннер можно скрыть
              isLoadSpinnerVisible: false,
              isSearchErrorVisible: false,
              isShowMoreButtonVisible: true,
              searchErrorHeading: '',
              searchErrorText: '',
              // Записали данные новостей в состояние компонента
              foundNews: news.articles,
            }, () => {
              // В этом коллбэке добавить 3 новости к отображению
              this.showMoreNews();
            });
          }
        })
        .catch((error) => {
          // Отловили ошибку
          console.log(error);
          // Показали ошибку поиска
          this.setState({
            // Если новости не найдены, спиннер можно скрыть
            isLoadSpinnerVisible: false,
            isSearchErrorVisible: true,
            isShowMoreButtonVisible: false,
            searchErrorHeading: 'Во время запроса произошла ошибка',
            searchErrorText: 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
          });
        });
    });
  }

  // Показывает больше новостей (число передаётся в аргументе)
  showMoreNews = (count = 3) => {
    console.log(this.state);
    // Из списка сохранённых новостей загрузить 3 новости
    const newsChunk = this.state.foundNews.slice(0, count);
    // Уменьшить список новостей на эти 3 новости
    const restOfNews = this.state.foundNews.slice(count, this.state.foundNews.length);
    // Добавление функции в стейт даёт нам доступ к текущему состоянию внутри самой функции
    this.setState((state) => {
      console.log(state);

      return {
        // Добавить эти три новости в список новостей для показа
        newsList: [...state.newsList, ...newsChunk],
        // Обновить список новостей в кеше
        foundNews: restOfNews,
      };
    }, () => {
      // После изменения стейта новостей проверим, не закончились ли новости в переменной foundNews
      this.setState({
        // Если новости закончились, выключаем кнопку, иначе включаем
        isShowMoreButtonActive: this.state.foundNews.length > 0,
      });

      console.log(this.state.newsList);
      console.log(this.state.foundNews);
    });
  }

  componentDidMount() {
    // Проверяем токен юзера при монтировании компонента
    this._checkUserToken();
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Switch>
          <Route exact path='/'>
            <Header isSomePopupOpened={this.state.isSomePopupOpened} closePopup={this.closeAllPopups} logout={this.logoutUser} openLoginPopUp={this.openLoginPopup} theme='theme_contrast' />
            <Main
              isShowMoreButtonActive={this.state.isShowMoreButtonActive}
              isShowMoreButtonVisible={this.state.isShowMoreButtonVisible}
              isLoadSpinnerVisible={this.state.isLoadSpinnerVisible}
              isSearchErrorVisible={this.state.isSearchErrorVisible}
              searchErrorHeading={this.state.searchErrorHeading}
              searchErrorText={this.state.searchErrorText}
              handleSearchSubmit={this.handleSearchSubmit}
              newsList={this.state.newsList}
              isSearchVisible={this.state.isSearchResultVisible}
              showMoreNews={this.showMoreNews}
            />
            <Footer />
          </Route>
          <ProtectedRoute path='/saved-news' isUserLogined={this.state.isUserLogined} component={SavedNews} isSomePopupOpened={this.state.isSomePopupOpened} closePopup={this.closeAllPopups} logout={this.logoutUser} openLoginPopUp={this.openLoginPopup} />
        </Switch>
        <LoginPopup changePopup={this.openRegisterPopup} isLoginPopupOpened={this.state.isLoginPopupOpened} close={this.closeAllPopups} onSubmit={this.loginUser} />
        <RegisterPopup changePopup={this.openLoginPopup} isRegisterPopupOpened={this.state.isRegisterPopupOpened} close={this.closeAllPopups} onSubmit={this.registerUser}/>
        <NotificationPopup changePopup={this.openLoginPopup} isNotificationPopupOpened={this.state.isNotificationPopupOpened} close={this.closeAllPopups} />
      </CurrentUserContext.Provider>
    );
  }
}

// Обернули компонент в withRouter для доступа
// к this.history.push()
export default withRouter(App);
