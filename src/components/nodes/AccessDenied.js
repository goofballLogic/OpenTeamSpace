import React from "react";
import { matchRoute } from "../routes";
import { Link } from "../routing";

const AccessDenied = ( { message, redirect, redirectFrom, linkText } ) => <article>

    <h2>Hmm, I can't do this {redirect ? "yet" : ""}</h2>
    {message && 
        <p>{message}</p>}
    {redirect &&
        <Link to={ redirect } from={ redirectFrom } name={ matchRoute( redirect ).name }>{ linkText || matchRoute( redirect ).name }</Link>}

</article>;

export default AccessDenied;