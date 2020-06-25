import React, {Component} from 'react'

import DefaultLayout from '../../layouts/default-layout'
import Header from '../../components/header'
import Content from '../../components/content'
import FileSelector from './partials/file-selector'
import ImageCropper from './partials/image-cropper'
import ListImages from './partials/list-images'
import ResolutionSelector from './partials/resolution-selector'

import {
  State_SelectionPending,
  State_SelectResolution,
  State_CropImage,
  State_SaveImageAndThumb,
  State_DisplayURLs
} from './app-states'

/**
 * Image Upload Container
 * @param {Object} props 
 * @returns {ReactElement} ImageUpload
 */
class ImageUpload extends Component {
  constructor () {
    super()

    /**
     * State machine's states
     */
    this.selectionPendingState = new State_SelectionPending(this)
    this.selectResolutionState = new State_SelectResolution(this)
    this.cropImageState = new State_CropImage(this)
    this.saveImageAndThumbState = new State_SaveImageAndThumb(this)
    this.displayURLsState = new State_DisplayURLs(this)

    // Defaults to Image Selection
    this.defaultState = this.selectionPendingState

    this.state = {
      // valid image extensions
      validImageType: ['jpg', 'jpeg', 'png'],
      accept: 'image/*',
      // resolution options for square thumbnail image
      resolutions: [
        10,
        20,
        50
      ],
      image: null,
      isImageOptimized: false,
      thumbNail: null,
      savedImage: null,
      savedThumb: null,
      appState: this.defaultState,
      selectedResolution: null,
      thumbNailURL: null,
      imageURL: null
    }
  }

  /**
   * Set Application State
   * @param {Object} state - state to transition to
   * @param {Function} cb - on setState done
   */
  setAppState (state, cb=()=>{}) {
    this.setState(
      {
        appState: state
      },
      cb
    )
  }

  getAppState () {
    return this.currentState 
  }

  render () {
    return (
      <DefaultLayout 
        header={
          <Header />
        }
        content={
          <Content 
            title={
              'Image Upload'
            }
            resetButton={
              /**
               * Reset button, returns to defaultState
               */
              this.state.appState.constructor.name !== this.defaultState.constructor.name &&
              <button
                className="btn btn__danger reset-state"
                onClick={this.onReset.bind(this)}
              >
                Reset
              </button>
            }
            main={ 
              <React.Fragment>
                { 
                  /**
                   * Select image from computer
                   */
                  this.state.appState.constructor.name === this.selectionPendingState.constructor.name &&
                  <FileSelector
                    validImageType={this.state.validImageType}
                    accept={this.state.accept}
                    onFileSelection={this.onImageSelection.bind(this)}
                  />
                }
                {
                  /**
                   * Select Resolution for thumbnail
                   */
                  this.state.appState.constructor.name === this.selectResolutionState.constructor.name &&
                  <ResolutionSelector
                    resolutions={this.state.resolutions}
                    onResolutionSelection={this.onResolutionSelection.bind(this)}
                  />
                }
                {
                  /*
                    Crop thumbnail;
                    Save image and thumbnail
                  */
                  this.state.appState.constructor.name === this.cropImageState.constructor.name &&
                  <ImageCropper 
                    image={this.state.image}
                    onCropComplete={this.onCropComplete.bind(this)}
                    resolution={this.state.selectedResolution}
                  />
                }
                {
                  /*
                    Links to saved image and thumbnail
                  */
                  this.state.appState.constructor.name === this.displayURLsState.constructor.name &&
                  <ListImages 
                    imageURL={this.state.imageURL}
                    thumbNailURL={this.state.thumbNailURL}
                  />
                }
              </React.Fragment>
            }
          />
        }
      />
    )
  }

  /**
   * Reset component state, corresponds to default state
   */
  onReset () {
    this.setState({
      image: null,
      isImageOptimized: false,
      thumbNail: null,
      savedImage: null,
      savedThumb: null,
      appState: this.selectionPendingState,
      selectedResolution: null,
      thumbNailURL: null,
      imageURL: null
    })
  }

  /**
   * Image Selected
   * @param {Object} {image - selected Image object, file - file object}
   * @returns {ReactElement} Logo
   */
  onImageSelection ({image, file}) {
    this.state.appState.selectImage({image, file})
  }

  /**
   * Resolution Selected
   * @param {Object} event - click event object
   * @returns {ReactElement} Logo
   */
  onResolutionSelection (event) {
    if (this.state.resolutions.indexOf(parseInt(event.target.value)) !== -1) {
      this.state.appState.selectResolution(parseInt(event.target.value))
    }
  }

  /**
   * Crop completed
   * @param {Object} image - generated thumbnail image object
   * @returns {ReactElement} Logo
   */
  onCropComplete (image) {
    this.state.appState.crop(image)
  }
}

export default ImageUpload;