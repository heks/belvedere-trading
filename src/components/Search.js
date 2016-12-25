import React, { Component, PropTypes } from 'react';
import { INPUT_CHANGED } from '../constants/ActionTypes';

export default class Search extends Component {

  handleChange = event => {
    const {dispatch, query} = this.props;
    const {target: {value}} = event;
    if (query !== value) {
      dispatch({type:INPUT_CHANGED, payload: {query: value}});
    }
  };

  render() {
    const { query } = this.props;
    return (
      <div className="search-container">
        <div className="search">
          <span className="fa fa-search"></span>
          <input placeholder="Search Gifs..." type="text" value={query} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};
