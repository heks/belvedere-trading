import React, { Component, PropTypes } from 'react';
import ImageLoader from 'react-imageloader';
import LazyLoad from 'react-lazyload';

// const colors = ['#ff0081', '#0a2463', '#ffff00', '#3e92cc'];
const colors = ['#48A9A6', '#4281A4', '#56A9D5', '#003DA5'];

export default class Gif extends Component {

  preloader = () => {
    let { gif: {images: {fixed_height: {height, width}, fixed_width } }, containerWidth } = this.props;
    if (width > containerWidth) {
      height = fixed_width.height;
      width = fixed_width.width;
    }
    return (
      <div style={{width, height}} className="spinner-container">
        <div className='fa fa-spinner fa-spin' />
      </div>
    );
  };

  render() {
    let { gif: {images: {fixed_height: {url, height, width}, fixed_height_still, fixed_width } }, containerWidth, index } = this.props;
    let loadUrl = url;
    if (width > containerWidth) {
      loadUrl = fixed_width.url;
      width = fixed_width.width;
    }
    return (
        <LazyLoad placeholder={this.preloader()} once>
          <div style={{width, height, border: `1px solid ${colors[index%4]}`, backgroundColor: colors[index%4]}}>
            <img src={loadUrl}/>
          </div>
        </LazyLoad>
    );
  }
}

          // <ImageLoader src={loadUrl} preloader={this.preloader} />


Gif.propTypes = {
  gif: PropTypes.object.isRequired,
  containerWidth: PropTypes.number.isRequired
};
