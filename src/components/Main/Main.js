import React from 'react';
import './Main.css';
import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import SearchResult from '../SearchResult/SearchResult';

class Main extends React.Component {
  render() {
    return (
      <main className='main'>
        <SearchForm handleSearchSubmit={this.props.handleSearchSubmit} />

        {this.props.isSearchVisible && <SearchResult
          isShowMoreButtonActive={this.props.isShowMoreButtonActive}
          isShowMoreButtonVisible={this.props.isShowMoreButtonVisible}
          isLoadSpinnerVisible={this.props.isLoadSpinnerVisible}
          isSearchErrorVisible={this.props.isSearchErrorVisible}
          searchErrorHeading={this.props.searchErrorHeading}
          searchErrorText={this.props.searchErrorText}
          newsList={this.props.newsList}
        />}
        <About />
      </main>
    );
  }
}

export default Main;
