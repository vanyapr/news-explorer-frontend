import React from 'react';
import './Main.css';
import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';

class Main extends React.Component {
  render() {
    return (
      <main className='main'>
        <SearchForm />
        <About />
      </main>
    );
  }
}

export default Main;
