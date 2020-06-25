import Upload from '@/services/upload'

/**
 * State corresponding to Image Selection
 */
export class State_SelectionPending {
  constructor (upload) {
    this.upload = upload;
  }

  cancelUpload () {
    console.log('no active upload')
  }
  selectImage ({image, file}) {
    console.log('image selected, select resolution')
    this.upload.setState({
      image,
      file
    })
    this.upload.setAppState(this.upload.selectResolutionState )
  }
  selectResolution () {
    console.log('cannot select resolution, image selection pending')
  }
  crop () {
    console.log('cannot crop, image selection pending')
  }
  saveImageAndThumbnail () {
    console.log('cannot save, image selection pending')
  }
  showSavedImageAndThumbnailURLs () {
    console.log('cannot show urls, image selection pending')
  }
}

/**
 * State corresponding to Resolution Selection
 */
export class State_SelectResolution {
  constructor (upload) {
    this.upload = upload;
  }

  cancelUpload () {
    console.log('cancelling upload')
    this.upload.setAppState(this.upload.selectionPendingState)
  }
  selectImage () {
    console.log('image selected already')
  }
  selectResolution (resolution) {
    console.log('resolution selected')
    this.upload.setState({
      selectedResolution: resolution
    })
    this.upload.setAppState(this.upload.cropImageState)
  }
  crop () {
    console.log('cannot crop, resolution selection pending')
  }
  saveImageAndThumbnail () {
    console.log('cannot save, resolution selection pending')
  }
  showSavedImageAndThumbnailURLs () {
    console.log('cannot show urls, resolution selection pending')
  }
}

/**
 * State corresponding to Image Cropping
 */
export class State_CropImage {
  constructor (upload) {
    this.upload = upload;
  }

  cancelUpload () {
    console.log('cancelling upload')
    this.upload.setAppState(this.upload.selectionPendingState)
  }
  selectImage () {
    console.log('image selected already')
  }
  selectResolution () {
    console.log('resolution already selected')
  }
  crop (image) {
    console.log('image cropping completed')
    this.upload.setState({thumbNail: image})
    this.upload.setAppState(
      this.upload.saveImageAndThumbState,
      () => {
        this.upload.state.appState.saveImageAndThumbnail()
      }
    )
  }
  saveImageAndThumbnail () {
    console.log('cannot save, cropping pending')
  }
  showSavedImageAndThumbnailURLs () {
    console.log('cannot show urls, cropping pending')
  }
}

/**
 * State corresponding to Saving Image and Thumbnail
 */
export class State_SaveImageAndThumb {
  constructor (upload) {
    this.upload = upload;
  }

  cancelUpload () {
    console.log('cancelling upload')
    this.upload.setAppState(this.upload.selectionPendingState)
  }
  selectImage () {
    console.log('image selected already')
  }
  selectResolution () {
    console.log('resolution already selected')
  }
  crop () {
    console.log('image already cropped')
  }
  saveImageAndThumbnail () {
    console.log('image save completed')
    this.saveThumbnails(this.upload.state.thumbNail)
    this.saveImage(this.upload.state.file)
    this.upload.setAppState(this.upload.displayURLsState)
  }
  showSavedImageAndThumbnailURLs () {
    console.log('cannot show urls, save pending')
  }

  async saveImage (file) {
    let response
    try {
      response = await Upload.getPreSignedURL(file, '')
    } catch (error) {
      // logger.error('Error in fetching pre-signed url', error)
      // this.onUploadFailure(this.fileUrl)
    } finally {
      const imageURL = await Upload.uploadFileToS3ByPreSignedURL(file, response.url, response.fields)
      this.upload.setState({
        imageURL: `${response.url}/${response.fields.key}`
      })
    }
  }

  async saveThumbnails (dataUrl) {
    try {
      const thumbNailURL = await Upload.dataUrl(dataUrl, this.uploadKeyPrefix)
      this.upload.setState({thumbNailURL})
    } catch (error) {
      console.log(error)
      // logger.error('Error in uploading image', error)
    }
  }
}

/**
 * State corresponding to Display saved Image and Thumbnail
 */
export class State_DisplayURLs {
  constructor (upload) {
    this.upload = upload;
  }

  cancelUpload () {
    console.log('image saving completed, select new image')
    this.upload.setAppState(this.upload.selectionPendingState)
  }
  selectImage () {
    console.log('image already selected')
  }
  selectResolution () {
    console.log('resolution already selected')
  }
  crop () {
    console.log('image already cropped')
  }
  saveImageAndThumbnail () {
    console.log('image already saved')
  }
  showSavedImageAndThumbnailURLs () {
    console.log('displaying urls of saved image')
  }
}