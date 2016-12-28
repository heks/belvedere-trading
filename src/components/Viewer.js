import React, { Component, PropTypes } from 'react';
import { CHANGE_LIGHTBOX } from '../constants/ActionTypes';
import Lightbox from 'react-images';

export default class Viewer extends Component {

  handleOnClose = () => {
  	const {dispatch} = this.props;
    dispatch({ type: CHANGE_LIGHTBOX, payload: {currentImage: 0, isOpen: false} });
  };

  handleOnClickNext = () => {
  	const {dispatch, lightbox:{currentImage}} = this.props;
  	dispatch({ type: CHANGE_LIGHTBOX, payload: {currentImage: currentImage+1} });
  };

  handleOnClickPrev = () => {
  	const {dispatch, lightbox:{currentImage}} = this.props;
	dispatch({ type: CHANGE_LIGHTBOX, payload: {currentImage: currentImage-1} });
  };

  handleOnClickThumbnail = (index) => {
  	const {dispatch} = this.props;
	dispatch({ type: CHANGE_LIGHTBOX, payload: {currentImage: index} });
  }

  render() {
    const {lightbox: {currentImage, isOpen}, gifs} = this.props;
    return (
      <Lightbox
          images={gifs.map(gif => {
            return {
            	src: gif.images.original.url,
            	thumbnail: gif.images.preview.url
            }
          })}
          currentImage={currentImage}
          onClose={this.handleOnClose}
          showThumbnails={true}
          onClickThumbnail={this.handleOnClickThumbnail}
          backdropClosesModal={true}
          onClickNext={this.handleOnClickNext}
          onClickPrev={this.handleOnClickPrev}
          isOpen={isOpen}
        />
    );
  };

}

Viewer.propTypes = {
  gifs: PropTypes.array.isRequired,
  lightbox: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};
