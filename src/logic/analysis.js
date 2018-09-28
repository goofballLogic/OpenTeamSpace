import { accumulate } from "tc2-react-time-series-graph";

const cache = {};

const memoizing = ( memoKeyFunc, func ) => ( ...args ) => ( key => cache[ key ] = cache[ key ] || func.apply( this, args ) )( memoKeyFunc.apply( this, args ) );

// thanks: https://stackoverflow.com/a/11508164/275501
function hexToRGB( hex ) {
    
    if ( !hex ) return "0,0,0";
    if ( hex.startsWith( "#" ) ) hex = hex.substring( 1 );
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;

}

const calculateSeriesLogic =

    team => 
        
        team && team.map( 
        
            ( person ) => 
            
                ( { 
                    
                    id: person.id, 
                    name: person.name, 
                    color: hexToRGB( person.colour ),
                    person
                    
                } ) 
                
        );

export const calculateSeries = memoizing( 
    
    team => JSON.stringify( team ), 
    calculateSeriesLogic
    
);

const buildScore = 

    ( when, { goal, uid, dir, diff } ) =>
    
        ( { 
                                   
           id: uid,
           when,
           score: +diff,
           description: `${ goal } (${dir})`,
           
       } );

const metricsToEvents =

    data =>

        data && Object.keys( data )
            .map( when => data[ when ].map( score => buildScore( when, score ) ) )
            .reduce( ( all, subset ) => [ ...all, ...subset ] );
            
const calculateDataLogic = ( { data } ) => accumulate( metricsToEvents( data ) );

export const calculateData =

    memoizing( ( { when } ) => when,
    calculateDataLogic        
        
);