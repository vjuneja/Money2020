import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from '../header'

const BasePage = ({ children, ...rest }) => (
    <div {...rest}>
        <Header/>
        {children}
    </div>
);

BasePage.propTypes = {
    children: PropTypes.node
}

export default BasePage;
