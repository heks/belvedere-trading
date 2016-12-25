import React, { Component, PropTypes } from 'react';
import { INPUT_CHANGED } from '../constants/ActionTypes';

export default class Search extends Component {

  handleChange = event => {
    const {target: {value}} = event;
    dispatch({type:INPUT_CHANGED, query: value});
  };

  render() {
    const { query } = this.props;
    return (
      <div className="counter-container">
        <input type="text" value={query} onChange={this.handleChange} />
      </div>
    );
  }
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};
