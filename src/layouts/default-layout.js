import React from 'react';

export default function DefaultLayout (props) {
  return (
    <React.Fragment>
      <div className="container">
        { props.header }
        { props.content }
      </div>
    </React.Fragment>
  );
}