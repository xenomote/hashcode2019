const fs = require('fs')

function readFile(name){
    let photos =  fs.readFileSync(name + ".txt", "utf-8").split('\n')
    let numPhotos = parseInt(photos.shift())
    if(photos.length > numPhotos) photos.pop()
    return photos.map((str, i) => {
        let photo = {id:i}
        let d = str.split(" ")
        photo.isV = d.shift() === "V"
        d.shift()
        photo.tags = d
        return photo
    });
}

function writeFile(slides, name){
    let output = slides.length + "\n"
    output += slides.map(s => "" + s.a.id +  ((s.b) ? " " + s.b.id: "")).join("\n")
    fs.writeFileSync(name, output)
}



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

function naiveSlideshow(photos) {
    let [ hList, vList ] = filterHV( photos )
    return constructVSlides( vList ).concat( constructHSlides( hList ) )
}

const {score} = require("./scoring.js")
const {generate} = require("./playingcard.js")


function doStage(name){
    let photos = readFile(name)
    // console.log(photos)

    // let slideshow = [slide1, slide2, slide3] 
    console.time("Searching")
    let slideshow = generate(naiveSlideshow(photos))
    console.timeEnd("Searching")
    console.log(score(slideshow))
    writeFile(slideshow, name + ".out")
}

doStage("a_example")
// doStage("b_lovely_landscapes")
// doStage("c_memorable_moments")
// doStage("d_pet_pictures")
// doStage("e_shiny_selfies")
