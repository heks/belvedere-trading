import React, { Component, PropTypes } from 'react';
import Gif from './Gif';
const InfiniteScroll = require('react-infinite-scroll')(React);

export default class Gifs extends Component {

  renderLoader = () => {
    return (
      <div className="spinner-container">
        <span className="fa fa-spinner fa-spin"></span>
      </div>
    );
  };

  handleLoadMore = () => {
    const {loadNextPage, pagination: {offset, id}} = this.props;
    loadNextPage(id, offset+1);
  };

  renderGifs = () => {
    const {loading, gifs, hasMore} = this.props;
    if(!loading) {
      return this.renderLoader();
    }
    return (
      <InfiniteScroll hasMore={hasMore} loader={this.renderLoader} loadMore={this.handleLoadMore}>
        <div className="grid">
          {gifs.map(gif => {return (<Gif gif={gif} key={gif.id} />)})}
        </div>
      </InfiniteScroll>
    );

  };


  render() {
    return (
      <div>
        {this.renderGifs()}
      </div>
    );
  }
}

Gifs.propTypes = {
  gifs: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadNextPage: PropTypes.func.isRequired
};
