import React, { Component } from 'react';
import { Link} from 'react-router';
import Helmet from 'react-helmet'

export default class NotFound extends Component {

  render() {
    return (
      <div>
        <Helmet title="Not found" />
        <h2>404: Not found</h2>
          <p>Sorry! Page that you are looking for cannot be found.</p>
        <Link to="/">Homepage</Link>
      </div>
    )
  };

}
