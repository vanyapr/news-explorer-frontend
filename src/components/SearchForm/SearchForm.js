import React from 'react';
import './SearchForm.css';

class SearchForm extends React.Component {
  render() {
    return (
      <section className='search-form'>
        <div className="search-form__container">
          <h1 className="search-form__heading">Что творится в&nbsp;мире?</h1>
          <p className="search-form__description">Находите самые свежие статьи на любую тему и сохраняйте в&nbsp;своём личном кабинете.</p>
          <form className="search-form__form">
            <input type="text" className="search-form__input" placeholder='Введите тему новости'/>
            <button className="search-form__button">Искать</button>
          </form>
        </div>
      </section>
    );
  }
}

export default SearchForm;
