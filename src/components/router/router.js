import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from 'query-string';

export const routeTo = (routeName, params ) => () => {
  const qs = queryString.stringify(params)
  window.location.hash = routeName + (qs ? '&' + qs : '')
}

const parseHash = hash => {
  const routeName = hash.split('&')[0].slice(1)
  const params = queryString.parse(hash.split('&').slice(1).join('&'))

  return {
    routeName,
    params
  }
}

class Router extends Component {
  constructor() {
    super();
    this.setRoute = this.setRoute.bind(this)
    this.state = {
      routeName: null,
      params: null
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.setRoute, false);
    this.setRoute()
  }

  setRoute() {
    this.setState(parseHash(window.location.hash))
  }

  render() {
    const { paths, ...rest} = this.props
    const { routeName, params } = this.state
    const RoutedComponent = paths[routeName] || paths.default

    return <RoutedComponent params={params} {...rest} />
  }
}

Router.propTypes = {
    test: PropTypes.string
}

export default Router;
