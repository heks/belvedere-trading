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
    const {loadNextPage, pagination: {offset, id}, hasMore} = this.props;
    console.log("loadMore");
    // hasMore && loadNextPage(id, offset+1);
  };

  renderGifList = () => {
    const {gifs, query} = this.props;
    if(gifs.length === 0 && query.length) {
      return (
        <div>
          <div className="grid">
            <h3> No results found for: <strong> {query} </strong> </h3>
          </div>
          <div className="text-center">
            <h4> <small> Try Again. </small> </h4>
          </div>
        </div>
      );
    }
    return (
      <div className="grid">
        {gifs.map(gif => {
          return (
            <Gif gif={gif} key={gif.id} />
          )})
        }
      </div>
    );
  };

  render() {
    const {hasMore, loading} = this.props;
    return (
      <div>
        <InfiniteScroll threshold={500} hasMore={hasMore} loader={this.renderLoader} loadMore={this.handleLoadMore}>
          {loading ? this.renderLoader() : this.renderGifList()}
        </InfiniteScroll>
      </div>
    );
  }
}

Gifs.propTypes = {
  gifs: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  pagination: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  loadNextPage: PropTypes.func.isRequired
};
