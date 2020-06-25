import React from 'react'

/**
 * Logo generator
 * @param {Object} props 
 * @returns {ReactElement} Logo
 */
export default function Logo(props) {
  return (
    <div className={`logo ${ props.size ? props.size : 'size--default'}`}>
        {
          /* invisible by default, pass params to show */
          props.type === 'FIRST' && 
            <svg className="icon--slintel-logo-text">
              <use xlinkHref="img/sprite.svg#slintel_logo_color"></use>
            </svg>
        }
    </div>
  )
}