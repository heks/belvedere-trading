import React, { Component, PropTypes } from 'react';
import ImageLoader from 'react-imageloader';

export default class Gif extends Component {

  preloader = () => {
  	return (
      <div className="spinner-container">
  	    <div className='fa fa-spinner fa-spin' />
      </div>
  	);
  };

  render() {
    const { gif: {images: {fixed_height: {url, height, width}, fixed_width } }, containerWidth } = this.props;
    let loadUrl = url;
    console.log(containerWidth);
    if (width > containerWidth) {
      loadUrl = fixed_width.url;
    }
    return (
      <div className="col">
		    <ImageLoader src={loadUrl} preloader={this.preloader} />
      </div>
    );
  }
}

Gif.propTypes = {
  gif: PropTypes.object.isRequired,
  containerWidth: PropTypes.number.isRequired
};
