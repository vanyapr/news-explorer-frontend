import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

class NewsCardList extends React.Component {
  render() {
    return (
      <ul className="card-list">
        <NewsCard showBadge={this.props.showBadge} buttonType={this.props.buttonType} tooltipText={this.props.tooltipText}/>
        <NewsCard showBadge={this.props.showBadge} buttonType={this.props.buttonType} tooltipText={this.props.tooltipText}/>
        <NewsCard showBadge={this.props.showBadge} buttonType={this.props.buttonType} tooltipText={this.props.tooltipText}/>
        <NewsCard showBadge={this.props.showBadge} buttonType={this.props.buttonType} tooltipText={this.props.tooltipText}/>
        <NewsCard showBadge={this.props.showBadge} buttonType={this.props.buttonType} tooltipText={this.props.tooltipText}/>
      </ul>
    );
  }
}

export default NewsCardList;
