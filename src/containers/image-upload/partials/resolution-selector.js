import React from 'react'

function ResolutionSelector (props) {
  return (
    <div className="resolution-selector">
      <select onChange={props.onResolutionSelection}>
        <option default>Select Your Resolution</option>
        {
          props.resolutions.map(
            (val) => {
              return <option value={val} key={val}>{val}X{val}</option>
            }
          )
        }
      </select>
    </div>
  )
}

export default ResolutionSelector
