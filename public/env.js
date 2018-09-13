( function( global ) {
    
    var isProduction = !!~document.location.hostname.indexOf( "openteamspace.com" );
    var props = isProduction ? {
        
        isProduction: true,
        clientId: "60961398610-f57jq6l5fu7ee84d6cvpnd06q3la36s2.apps.googleusercontent.com",
        apiKey: "AIzaSyA8EVrtUXJWsKRY9dKrk7xL0oAps2qk7LE"

    } : {
            
        isProduction: false
            
    };
    global.env = Object.assign( {}, global.env, props );
    
}( window || global ) );