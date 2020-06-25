import React, {Component} from 'react'
import ReactCrop from 'react-image-crop'

/**
 * Crop Image
 */
class ImageCropper extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      crop: {
        unit: 'px',
        width: 300,
        aspect: 1,
      },
      croppedImageUrl: null
    }
  }

  render () {
    const { crop, croppedImageUrl } = this.state
    return (
      <div className="image-cropper">
        <div className="image-cropper__crop-zone">
          {this.props.image.src && 
            <ReactCrop
              src={this.props.image.src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded.bind(this)}
              onComplete={this.onCropComplete.bind(this)}
              onChange={this.onCropChange.bind(this)}
            />
          }
        </div>
        <div className="image-cropper__preview-zone">
          {
            croppedImageUrl && (
              <div>
                <div className="image-cropper__preview-zone-title"><b>Thumb Preview</b></div>
                <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
              </div>
            )
          }
          <button
            className="btn btn__primary"
            onClick={this.onCropSave.bind(this)}
          >
            Save
          </button>
        </div>
      </div>
    )
  }

  onImageLoaded (image) {
    this.imageRef = image
  }

  onCropComplete (crop) {
    this.makeClientCrop(crop)
  }

  onCropChange (crop) {
    this.setState({ crop })
  }

  onCropSave () {
    this.props.onCropComplete(this.state.croppedImageUrl)
  }

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl })
    }
  }

  getCroppedImg(image, crop) {
    const {resolution} = this.props
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = resolution
    canvas.height = resolution
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      resolution,
      resolution
    )

    return new Promise((resolve, reject) => {
      resolve(canvas.toDataURL())
    })
  }
}

export default ImageCropper

