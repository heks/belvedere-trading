import React, { Component, PropTypes } from 'react';
import Gif from './Gif';

export default class Gifs extends Component {

  renderGifs = () => {
    const {loading, gifs} = this.props;
    if(!loading) {
      return (<span className="fa fa-spinner fa-spin"></span>);
    }
    return gifs.map(gif => {
      return (
         <Gif gif={gif} key={gif.id} />
      );
    });
  };


  render() {
    return (
      <div className="grid">
        {this.renderGifs()}
      </div>
    );
  }
}

Gifs.propTypes = {
  gifs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};
