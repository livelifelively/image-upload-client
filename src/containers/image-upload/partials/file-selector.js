import React, {Component} from 'react'
import Mime from 'mime-types'

/**
 * Select image file to be uploaded
 * Returns raw file and file as dataUrl
 */
class Uploader extends Component {
  constructor (props) {
    super(props)
    this.onFileSelection = this.onFileSelection.bind(this)
  }

  render () {
    return (
      <div className="file-selector">
        <input
          type="file"
          accept={this.props.accept}
          onChange={this.onFileSelection} 
        />
        <div className="file-selector__facade">
          Click Here Select Image.
        </div>
      </div>
    )
  }

  /**
   * Handle file selection
   * @param {Object} event Event On file selection
   */
  async onFileSelection (event) {
    const file = event.target.files[0]
    if (this.isValidImageType(file.type)) {
      var reader = new window.FileReader()
      reader.onload = (evt) => {
        var image = new window.Image()
        image.src = evt.target.result
        image.onload = () => {
          this.props.onFileSelection({
            image,
            file
          })
        }
      }
      reader.readAsDataURL(event.target.files[0])
    } else {
      this.$message('Please provide a valid jpeg or png image')
    }
  }

  /**
   * Check if amoung valid file types
   * @param {String} fileType 
   */
  isValidImageType (fileType) {
    return this.props.validImageType.indexOf(Mime.extension(fileType)) > -1
  }
}

export default Uploader
