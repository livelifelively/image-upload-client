import React from 'react'

/**
 * Content Block in the layout
 * @param {Object} props 
 * @returns {ReactElement} Logo
 */
export default function Content(props) {
  return (
    <section className="content">
      <div className="content__title">
          { props.title }
          { props.resetButton }
      </div>
      <div className="content__body">
        <div className="content__body--main">
            { props.main }
        </div>
        <div className="content__body--right">
            { props.right }
        </div>
      </div>
    </section>
  )
}