( function( global ) {
    
    global.env = Object.assign( {}, global.env, { 
      
        isProduction: !!~document.location.hostname.indexOf( "openteamspace.com" )
  
    } );
    
}( window || global ) );