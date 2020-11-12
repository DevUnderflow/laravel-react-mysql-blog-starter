import React from 'react';

const Spinner = (props) => {
  return props.show? (
      <div className="overlay m-8 flex justify-center items-center text-4xl">
          <i className="fa fa-circle-o-notch fa-spin"></i>
      </div>
  ) : null;
};
export default Spinner;
