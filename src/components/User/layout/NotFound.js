import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (

        <div className="PageNotFound">
            <ErrorIcon />
            <Typography>Page Not Found</Typography>
            <p>We're sorry, but the page you requested could not be found.</p>
            <Link to="/">Home</Link>
        </div>
    );
};

export default NotFound;