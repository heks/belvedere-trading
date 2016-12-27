import React, { Component, PropTypes } from 'react';
import Gif from './Gif';
import Dimensions from 'react-dimensions';
const InfiniteScroll = require('react-infinite-scroll')(React);

@Dimensions()
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
    hasMore && loadNextPage(id, offset+1);
  };

  renderGifList = () => {
    const {gifs, query, hasMore, containerWidth} = this.props;
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
      <div>
        <div className="grid">
        {gifs.map((gif, index) => {
          return (
            <Gif gif={gif} containerWidth={containerWidth} key={gif.id} index={index}/>
          )})
        }
        </div>
        {hasMore && (<div className="load-more-container">
          <a onClick={this.handleLoadMore}> Load More </a>
        </div>)}
      </div>
    );
  };

  render() {
    const {hasMore, loading} = this.props;
    return (
      <div>
        {loading ? this.renderLoader() : this.renderGifList()}
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
