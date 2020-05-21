import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';


const Header = () => (
  <div className="ui secondard pointing menu">
    <Link to="/" className="item">
      Periwinkle - Chess Tournament Manager
    </Link>
    <div className="right menu">
      <Link to="/" className="item">
        All Tournaments
      </Link>
      <GoogleAuth />
    </div>
  </div>
);

export default Header;
