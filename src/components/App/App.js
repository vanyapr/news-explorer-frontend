import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'; // Компоненты для роутинга и редиректа
import './App.css';
import Auth from '../../utils/Auth'; // Апи авторизации
import MainApi from '../../utils/MainApi'; // Основное апи
import NewsApi from '../../utils/NewsApi'; // Апи новостей
import utils from '../../utils/utils';
import Header from '../Header/Header'; // Шапка
import Main from '../Main/Main'; // Главная страница
import SavedNews from '../SavedNews/SavedNews'; // Сраница сохранённых новостей
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import NotificationPopup from '../NotificationPopup/NotificationPopup'; // Подвал
import { CurrentUserContext } from '../../contexts/currentUserContext'; // Контекст текущего юзера
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // Защищённый роут

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isUserLogined: false, // Авторизован ли юзер
      token: '',
      currentUser: false, // Текущий пользователь (объект)
      isLoginPopupOpened: false, // Открыт ли попап логина
      isRegisterPopupOpened: false, // Открыт ли попап регистрации
      isNotificationPopupOpened: false, //
      isSomePopupOpened: false, // Открыт ли хотя бы один попап
      isLoadSpinnerVisible: false, // Видим ли спиннер "идёт поиск новостей"
      isSearchErrorVisible: false, // Видима ли ошибка поиска
      searchErrorHeading: '', // Заголовок ошибки поиска
      searchErrorText: '', // Текст ошибки поиска
      searchString: '', // Текущее значение строки поиска
      isShowMoreButtonVisible: false, // Показывается ли кнопка поиска
      isShowMoreButtonActive: false, // Активна ли кнопка поиска
      isSearchResultVisible: false, // Виден ли блок результатов поиска
      foundNews: [], // Список найденных новостей
      newsList: [], // Список новостей для показа
      savedNewsList: [], // Список сохранённых новостей
      articlesWord: '',
      keywordsList: '',
      keywordsRest: 0,
      keywordsRestEnding: '',
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
  // 1. Показать лоадер
  // 1. Выполнить запрос
  // 1. Скрыть лоадер
  // 1. В случае ошибки показать ошибку
  // 1. Показать блок "Результаты поиска"
  // 1. Если новости найдены, показать кнопку "ещё"
  // 1. Когда все карточки отрисованы, кнопка «Показать ещё» должна пропасть.
  // 1. По 3 новости рендерим на главной
  // 1) Добавление статьи в избранное
  // 1) При нажатии на иконку сохранения статьи неавторизованным пользователем открывается модальное окно с предложением зарегистрироваться
  // 1. Рендер списка сохранённых карточек
  // 1. Число сохранённых статей
  // 1. Ключевые слова сохранённых статей
  // 1) Удаление статьи из избранного
  // 0) Обрезать строку поиска в тултипе строки поиска в сохраненных статьях
  // 1) Обернуть компоненты в чистый компонент

  // TODO:

  // FIXME
  // 1) Когда редиректим из /saved-news неавторизованного юзера на страницу /
  // - надо открывать попап авторизации:
  // - когда юзер открывает роут
  // - проверить авторизацию
  // - если не авторизован
  // - открыть попап

  // Принимает токен, инициализирует экземпляр апи
  _setApi = (token) => {
    this._api = new MainApi(token);
  }

  // Авторизует пользователя по переданным в JSON данным
  loginUser = (loginData) => {
    // Возвращаем промис чтобы передать ошибку в форму
    return Auth.login(loginData)
      .then((responce) => {
        // Если ответ получен, обработали
        if (responce) {
          const { token } = responce;
          // Записали полученный токен в хранилище
          this._saveToken(token);
          // Получили данные юзера по токену
          this._getUserData(token).then((userData) => {
            // Авторизовали юзера
            this._authoriseUser(userData, token);
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
    return Auth.register(userData)
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
  _authoriseUser = (userData, token) => {
    this._setApi(token);
    this.setState(() => {
      return {
        currentUser: userData,
        isUserLogined: true,
        token,
      };
    });
  }

  // Удаляет данные юзера из приложения и редиректит на главную страницу
  _unauthoriseUser = () => {
    this.setState({
      currentUser: false,
      isUserLogined: false,
    }, () => {
      this.props.history.push('/');
    });
  }

  // Получает данные пользователя из апи
  _getUserData = (token) => {
    // Запросили данные по апи
    return Auth.getUserData(token);
  }

  // Проверяет токен и в случае его корректности авторизует юзера и сохраняет токен в состоянии
  _checkUserToken = () => {
    // Прочитали токен
    const token = this._readToken();

    if (token) {
      // Отправили токен по апи
      this._getUserData(token)
        .then((userData) => {
          // Авторизовали юзера в случае успеха
          this._authoriseUser(userData, token);
          // Когда юзер авторизован, мы можем записать его сохраненные новости в состояние
          this._getSavedNewsList();
        })
        .catch((error) => {
          // Если токена нет, или авторизация не удалась
          // Мы не выводим в консоль эту ошибку, потому что это нормальная практика
          // Меняем состояние на неавторизованнное
          this._unauthoriseUser();
          // Удаляем токен, если он есть, но не прошел проверку
          this._deleteToken();
        });
    } else {
      // Если токена нет, покажем окно авторизации
      this.openLoginPopup();
    }
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
    this.setState({
      // Показали результаты поиска
      isSearchResultVisible: true,
      isSearchErrorVisible: false,
      isLoadSpinnerVisible: true,
      isShowMoreButtonVisible: false,
      searchString,
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
              searchString: '', // Сбросим строку поиска
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
            searchString: '', // Сбросим строку поиска
            searchErrorHeading: 'Во время запроса произошла ошибка',
            searchErrorText: 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
          });
        });
    });
  }

  // Показывает больше новостей
  showMoreNews = () => {
    // Используем функцию в состоянии, иначе значения не обновятся
    this.setState((state) => {
      // Из списка сохранённых новостей отрезать новости с 0 по 3
      const newsChunk = state.foundNews.slice(0, 3);
      // Отрезать список начиная с 3 пункта и до конца
      const restOfNews = state.foundNews.slice(3, state.foundNews.length + 1);
      return {
        // Перезаписать список новостей в состоянии
        newsList: [...this.state.newsList, ...newsChunk],
        // Перезаписать список найденных новостей
        foundNews: restOfNews,
      };
    }, () => {
      // После изменения стейта новостей проверим, не закончились ли новости в переменной foundNews
      this.setState({
        // Если новости закончились, выключаем кнопку, иначе включаем
        isShowMoreButtonActive: this.state.foundNews.length > 0,
      });
    });
  }

  // Принимает данные статьи, сохраняет статью в избранных у текущего пользователя
  saveToFavorites = (newsItem) => {
    // Преобразуем в формат совместимый с апи
    const itemToSave = utils.convertToApiFormat(newsItem, this.state.searchString);

    // Передадим её в апи
    return this._api.saveToFavorites(itemToSave)
      .then((savingResult) => {
        // Конвертировали полученный результат в формат приложения
        const savedNewsAddon = utils.convertListToAppFormat([savingResult]);
        // Обновили список карточек в состоянии
        const updatedSavedNewsList = [...this.state.savedNewsList, ...savedNewsAddon];
        this.setState({
          savedNewsList: updatedSavedNewsList,
        }, () => {
          this._fillSavedNewsHeader(updatedSavedNewsList);
        });

        return savingResult;
      })
      .catch((error) => {
        // В случае ошибки вернём реджект
        return Promise.reject(new Error(`Что-то пошло не так ${error}`));
      });
  }

  // Получает по апи список сохраненных новостей
  _getSavedNewsList = () => {
    this._api.getSavedNewsList()
      .then((savedNews) => {
        // Полученный список сохранённых новостей преобразуем в совместимый формат
        const newsToDisplay = utils.convertListToAppFormat(savedNews);

        this.setState({
          savedNewsList: newsToDisplay,
        }, () => {
          this._fillSavedNewsHeader(newsToDisplay);
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  deleteFromFavorites = (newsId) => {
    // При удалении карточки мы удаляем из состояния карточку с нужным ID
    this._api.deleteNewsItem(newsId).then((deletionResult) => {
      const updatedNewssList = this.state.savedNewsList.filter((item) => item._id !== newsId);
      this.setState({
        savedNewsList: updatedNewssList,
      }, () => {
        this._fillSavedNewsHeader(updatedNewssList);
      });
    }).catch((error) => {
      // В случае ошибки удаления, вывели её в консоль
      console.log(error);
    });
  }

  // Сформировать значения для шапки сохраненных статей
  _fillSavedNewsHeader = (newsList) => {
    // Вывести первые 2 уникальных слова
    // Собрать все ключевые слова в массив
    const keywords = [];
    newsList.forEach((item) => {
      keywords.push(item.keyword);
    });

    // Отфильтровать массив на уникальные значения
    const uniqueKeywords = keywords.filter((item, index, array) => {
      // Вернуть только те значения, у которых
      return array.indexOf(item) === index;
    });

    // Отсортировать массив по алфавиту
    const sortedUniqueKeywords = uniqueKeywords.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    // Посчитать длину массива чобы узнать сколько сохранено новостей
    const lastDigitOfKeywordsCount = 1 * this.state.savedNewsList.length.toString().slice(-1);

    // Переменная для слова "статей"
    let articlesWord = '';

    // Рассчитываем окончание предложения
    switch (lastDigitOfKeywordsCount) {
    case 1:
      articlesWord = 'сохранённая статья';
      break;
    case 2:
    case 3:
    case 4:
      articlesWord = 'сохранённых статьи';
      break;
    default:
      articlesWord = 'сохранённых статей';
    }

    // Статей/статьи/статья
    let keywordsList = '';
    if (uniqueKeywords.length === 3) {
      // Если статей три, надо показывать все три
      keywordsList = `${sortedUniqueKeywords[0]}, ${sortedUniqueKeywords[1]}, ${sortedUniqueKeywords[2]}`;
    } else if (uniqueKeywords.length > 1) {
      keywordsList = `${sortedUniqueKeywords[0]}, ${sortedUniqueKeywords[1]}`;
    } else if (uniqueKeywords.length === 1) {
      keywordsList = `${sortedUniqueKeywords[0]}`;
    } else {
      keywordsList = false;
    }

    // Окончание числа ключивых слов
    let keywordsRest = 0;
    if (uniqueKeywords.length > 3) {
      keywordsRest = uniqueKeywords.length - 2;
    } else {
      keywordsRest = 0;
    }

    const lastDigitOfRest = 1 * (keywordsRest.toString().slice(-1));
    let keywordsRestEnding = '';

    console.log(lastDigitOfRest);
    switch (lastDigitOfRest) {
    case 1:
      keywordsRestEnding = `${keywordsRest}-му другому`;
      break;
    case 2:
    case 3:
    case 4:
      keywordsRestEnding = `${keywordsRest}-м другим`;
      break;
    case 7:
    case 8:
      keywordsRestEnding = `${keywordsRest}-ми другим`;
      break;
    case 0 && keywordsRest === 0:
      keywordsRestEnding = `${keywordsRest} других`;
      break;
    default:
      keywordsRestEnding = `${keywordsRest}-ти другим`;
    }

    this.setState({
      articlesWord,
      keywordsList,
      keywordsRest,
      keywordsRestEnding,
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
              openLoginPopup={this.openLoginPopup}
              saveToFavorites={this.saveToFavorites}
            />
            <Footer />
          </Route>
          <ProtectedRoute path='/saved-news'
            isUserLogined={this.state.isUserLogined}
            component={SavedNews}
            isSomePopupOpened={this.state.isSomePopupOpened}
            closePopup={this.closeAllPopups}
            logout={this.logoutUser}
            newsList={this.state.savedNewsList}
            openLoginPopUp={this.openLoginPopup}
            deleteCard={this.deleteFromFavorites}
            articlesWord={this.state.articlesWord}
            keywordsList={this.state.keywordsList}
            keywordsRest={this.state.keywordsRest}
            keywordsRestEnding={this.state.keywordsRestEnding}
          />
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
