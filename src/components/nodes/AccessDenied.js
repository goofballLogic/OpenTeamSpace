import React from "react";
import { map } from "../routes";
import { Link } from "../routing";

const AccessDenied = ( { message, redirect, redirectFrom, linkText } ) => <article>

    <h2>Access denied</h2>
    {message && 
        <p>{message}</p>}
    {redirect &&
        <Link to={ redirect } from={ redirectFrom } name={ map[ redirect ].name }>{ linkText || map[ redirect ].name }</Link>}

</article>;

export default AccessDenied;