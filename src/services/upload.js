import axios from 'axios'

import http from '@/services/http'

export default {
  /**
   * Get Presigned URL from s3
   * @param {Object} file 
   * @param {String} uploadKeyPrefix 
   * @returns {Object} PresignedUrlData
   */
  async getPreSignedURL (file, uploadKeyPrefix) {
    try {
      const PresignedUrlData = await http.post({
        url: 'http://localhost:3000/upload/image/pre-signed-url',
        data: {
          fileType: file.type,
          uploadKeyPrefix
        }
      })
      return PresignedUrlData
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * Upload to s3 using presigned url
   * @param {Object} file - file object
   * @param {String} uploadUrl - url to upload to
   * @param {Object} uploadParams 
   */
  async uploadFileToS3ByPreSignedURL (file, uploadUrl, uploadParams) {
    var formData = new window.FormData()
    for (let param in uploadParams) {
      formData.append(param, uploadParams[param])
    }
    formData.append('acl', 'public-read')
    formData.append('Content-Type', file.type)
    formData.append('file', file)
    try {
      const responsePromise = axios.post(
        uploadUrl,
        formData
      )
      return responsePromise
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * Upload to s3 via server using dataUrl format
   * @param {String} dataUrl - Data Url for Thumbnail
   * @param {String} uploadKeyPrefix - prefix for name
   */
  async dataUrl (dataUrl, uploadKeyPrefix) {
    try {
      const data = await http.post({
        url: 'http://localhost:3000/upload/image/data-url',
        data: {
          dataUrl,
          uploadKeyPrefix
        }
      })
      return data.url
    } catch (error) {
      console.log(error)
    }
  }
}
