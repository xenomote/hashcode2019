function filterHV( photoList ) {
    let hList = [];
    let vList = [];
    photoList.forEach( function ( photo, i, a ) {
        if( photo.isV )
            vList.push( photo )
        else
            hList.push( photo )
    } );
    return [ hList, vList ];
}

function constructHSlides( hList ) {
    let hSlides = [];
    hList.forEach( function ( photo, i, a ) {
        hSlides.push( { a : photo } )
    } );
    return hSlides;
}

function constructVSlides( vList ) {
    let vSlides = [];
    for( let i = 0; i < vList.length; i += 2 ) {
        vSlides.push( { a : vList[i], b : vList[i + 1] } )
    }
    return vSlides;
}

function concatAll() {
    let [ hList, vList ] = filterHV( readFile( "./c_memorable_moments" ) )
    return constructVSlides( vList ).concat( constructHSlides( hList ) )
}
