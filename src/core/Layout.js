import React from "react";
import Menu from "./Menu";
import AppBar from '../core/AppBar'
import TestBar from '../core/TestBar'
import "../styles.css";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
        <div>
            {/* <Menu /> */}
            <AppBar />
            {/* <TestBar /> */}
            <div
                //style={{ marginTop: '60px' }}
                className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    );

export default Layout;
