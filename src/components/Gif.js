import React, { Component, PropTypes } from 'react';
import ImageLoader from 'react-imageloader';

export default class GifItem extends Component {

  preloader = () => {
  	return (
      <div className="spinner-container">
  	    <div className='fa fa-spinner fa-spin' />
      </div>
  	);
  };

  render() {
    const { gif: {images: {downsized: {url, height, width} } } } = this.props;
    return (
      <div className="col">
		    <ImageLoader imgProps={{width, height}} src={url} preloader={this.preloader} />
      </div>
    );
  }
}

GifItem.propTypes = {
  gif: PropTypes.object.isRequired,
};
