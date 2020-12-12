import React from 'react';
import './Main.css';
import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import SearchResult from '../SearchResult/SearchResult';

class Main extends React.Component {
  render() {
    return (
      <main className='main'>
        <SearchForm />
        <SearchResult/>
        <About />
      </main>
    );
  }
}

export default Main;
