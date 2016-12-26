import React, { Component, PropTypes } from 'react';
import { INPUT_CHANGED, BUTTON_CLICK } from '../constants/ActionTypes';

export default class Search extends Component {

  handleChange = event => {
    const {dispatch, query} = this.props;
    const {target: {value}} = event;
    if (query !== value) {
      dispatch({type:INPUT_CHANGED, payload: {query: value}});
    }
  };

  handleOnClickButton = input => {
    return this.handleRequest.bind(this, input);
  };

  handleRequest = other => {
    const {dispatch} = this.props;
    dispatch({type:BUTTON_CLICK, payload: {query: '', other}});
  };

  render() {
    const { query } = this.props;
    return (
      <div className="search-container">
        <div className="search">
          <span className="fa fa-search"></span>
          <input placeholder="Search Gifs..." type="text" value={query} onChange={this.handleChange} />
        </div>
        <div className="search-buttons">
          <button onClick={this.handleOnClickButton('trending')}>Get Trending</button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};
