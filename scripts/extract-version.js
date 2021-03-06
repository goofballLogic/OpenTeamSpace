const path = require( "path" );
const child_process = require( "child_process" );
const p = require( "../package.json" );
const fs = require( "fs" );
const metaFile = path.resolve( __dirname, "../src/meta.json" );
fs.writeFileSync( metaFile, JSON.stringify( { version: `${p.version}-alpha` }, null, 3 ) );
child_process.exec( "git commit -a -m 'meta file generated'" ); 