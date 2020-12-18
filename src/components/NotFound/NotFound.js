import React from 'react';
import './NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className='not-found'>
        <div className="not-found__icon">{this.props.searchErrorHeading}</div>
        <h2 className="not-found__heading">{this.props.searchErrorHeading}</h2>
        <p className="not-found__description">
          {this.props.searchErrorText}
        </p>
      </div>
    );
  }
}

export default NotFound;
