import React from 'react';
import './Preloader.css';

class Preloader extends React.PureComponent {
  render() {
    return (
      <div className="preloader">
        <div className="preloader__spinner">Загрузка</div>
        <p className='preloader__text'>Идет поиск новостей...</p>
      </div>
    );
  }
}

export default Preloader;
