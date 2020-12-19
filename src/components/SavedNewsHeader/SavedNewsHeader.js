import React from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/currentUserContext'; // Контекст текущего юзера

class SavedNewsHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newsCount: this.props.newsList.length,
      articlesWord: '',
      keywordsList: '',
      keywordsRest: 0,
      keywordsRestEnding: '',
    };
  }

  static contextType = CurrentUserContext;

  _fillStatusString = () => {
    // Собрать все ключевые слова в массив
    const keywords = [];
    this.props.newsList.forEach((item) => {
      keywords.push(item.keyword);
    });

    // Вывести первые 2 уникальных слова
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

    // Посчитать длину массива
    const lastDigitOfKeywordsCount = 1 * this.state.newsCount.toString().slice(-1);

    let articlesWord = ''; // Слово "Статей"

    switch (lastDigitOfKeywordsCount) {
    case 1:
      articlesWord = 'статья';
      break;
    case 2:
    case 3:
    case 4:
      articlesWord = 'статьи';
      break;
    default:
      articlesWord = 'статей';
    }

    // Статей/статьи/статья
    const keywordsList = `${sortedUniqueKeywords[0]}, ${sortedUniqueKeywords[1]}`;

    // Окончание числа ключивых слов
    const keywordsRest = this.props.newsList.length - 2;
    const lastDigitOfRest = 1 * (keywordsRest.toString().slice(-1));
    let keywordsRestEnding = '';

    switch (lastDigitOfRest) {
    case 1:
      keywordsRestEnding = '-му';
      break;
    case 2:
    case 3:
    case 4:
      keywordsRestEnding = '-м';
      break;
    case 7:
    case 8:
      keywordsRestEnding = '-ми';
      break;
    default:
      keywordsRestEnding = '-ти';
    }

    console.log(lastDigitOfRest);
    console.log(keywordsRestEnding);

    this.setState({
      articlesWord,
      keywordsList,
      keywordsRest,
      keywordsRestEnding,
    });
  }

  componentDidMount() {
    this._fillStatusString();
  }

  render() {
    return (
      <section className="saved-header">
        <div className="saved-header__container">
          <h1 className="saved-header__title">Сохранённые статьи</h1>
          <p className="saved-header__subtitle">{this.context.name}, у вас {this.state.newsCount} сохранённых {this.state.articlesWord}</p>
          <p className="saved-header__description">По ключевым словам: <strong className="saved-header__strong">{this.state.keywordsList}</strong> и <strong className="saved-header__strong">{this.state.keywordsRest}{this.state.keywordsRestEnding} другим</strong></p>
        </div>
      </section>
    );
  }
}

export default SavedNewsHeader;
