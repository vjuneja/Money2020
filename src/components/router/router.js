import React, { Component } from "react";
import PropTypes from "prop-types";
import querystring from 'query-string';

export const routeTo = (routeName, params ) => () => {
  const qs = querystring.stringify(params)
  window.location.hash = routeName + (qs ? '&' + qs : '')
}

class Router extends Component {
  constructor() {
    super();
    this.setRoute = this.setRoute.bind(this)
    this.state = {
      route: null
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.setRoute, false);
    this.setRoute()
  }

  setRoute() {
    console.log('SETTING ROUTE', window.location.hash)
    this.setState({
        route: (window.location.hash || '').slice(1) || null
    })
  }

  render() {
    const { paths } = this.props
    const { route } = this.state
    const RoutedComponent = paths[route] || paths.default
    return <RoutedComponent />
  }
}

Router.propTypes = {
    test: PropTypes.string
}

export default Router;
