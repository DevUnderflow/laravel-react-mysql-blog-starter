import React from 'react';
import { withRouter } from "react-router";

const Footer  = (props) => {
  return props.location.pathname != '/login'?(
      <footer className="main-footer">
          <strong>Referroute &copy; 2020.</strong>
      </footer>
  ):null;
};

export default withRouter(Footer);