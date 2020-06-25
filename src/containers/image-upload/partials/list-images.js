import React from 'react'

function ListImages (props) {
  return (
    <div className="images-list">
      <div className="images-list--unit">
        Image URL: 
        <a target="_blank" href={props.imageURL}>
          {props.imageURL || 'Uploading'}
        </a>
      </div>
      <div className="images-list--unit">
        Thumbnail URL: 
        <a target="_blank" href={props.thumbNailURL}>
          {props.thumbNailURL || 'Uploading'}
        </a>
      </div>
    </div>
  )
}

export default ListImages