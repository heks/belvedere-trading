import React, { Component, PropTypes } from 'react';
import { INPUT_CHANGED, BUTTON_CLICK, ENTER_PRESSED, ESC_PRESSED} from '../constants/ActionTypes';
import classNames from 'classnames';

export default class Search extends Component {

  handleChange = event => {
    const {dispatch, query} = this.props;
    const {target: {value}} = event;
    if (query !== value) {
      dispatch({type:INPUT_CHANGED, payload: {query: value}});
    }
  };

  handleKeyDown = event => {
    const {dispatch, query} = this.props;
    if(event.key == 'Enter'){
      dispatch({type: ENTER_PRESSED, payload: {query}});
    } else if(event.keyCode == 27) {
      dispatch({type: ESC_PRESSED});
    }
  };

  handleOnClickButton = input => {
    return this.handleRequest.bind(this, input);
  };

  handleOnClick = event => {
    const {dispatch} = this.props;
    dispatch({type: ESC_PRESSED});
  };

  handleRequest = other => {
    const {dispatch} = this.props;
    dispatch({type:BUTTON_CLICK, payload: {query: '', other}});
  };

  render() {
    const { query } = this.props;
    const cx = classNames('fa', {'fa-search': (query.length === 0), 'fa-times': (query.length !== 0)})
    return (
      <div className="search-container">
        <div className="search">
          <span onClick={(query.length !== 0) && this.handleOnClick} className={cx}></span>
          <input placeholder="Search Gifs..." type="text" value={query} onChange={this.handleChange}  onKeyDown={this.handleKeyDown} />
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
