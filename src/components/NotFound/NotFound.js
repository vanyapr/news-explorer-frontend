import React from 'react';
import './NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className='not-found'>
        <div className="not-found__icon">Ничего не нашлось</div>
        <h2 className="not-found__heading">Ничего не найдено</h2>
        <p className="not-found__description">
          К сожалению по вашему запросу
          ничего не найдено.
        </p>
      </div>
    );
  }
}

export default NotFound;
