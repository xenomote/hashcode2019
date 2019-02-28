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

function orderByNumberOfTags(photos){
    return photos.sort((a, b) => {- a.tags.length + b.tags.length})
}

function countOverlap(l1, l2){
    return l1.filter(p => l2.includes(p)).length
}

function reorderSlideshow(slidePool){
    for (let i = 0; i < slidePool.length; i++) {
        const curSlide = slidePool[i];
        const targetOverlap = tags(curSlide).length * 0.4
        const curTags = tags(curSlide)
        for (let j = 1; j < 100; j++) {
            const potentialMatch = slidePool[i+j];
            if(countOverlap(curTags, tags(potentialMatch)) >= targetOverlap){
                slidePool.splice(i, 0, potentialMatch);
                slidePool.splice(i+j, 1);
            }
        }
    }
    return slidePool
}

const {score, tags, compare} = require("./scoring.js")
const {generate} = require("./playingcard.js")

function lina(name){
    let photos = readFile(name)
    let slideshow = naiveSlideshow(photos)
    console.time("Searching")
    for( let i = 0; i < slideshow.length - 1; ++i ) {
        let bestI = i + 1
        let bestC = 0
        for( let j = i+1; j < slideshow.length; ++j ) {
            let diff = compare( slideshow[i], slideshow[j] )
            if( diff > bestC ) {
                bestC = diff
                bestI = j
                if(bestC > 2)break
                // if(bestC > 2)break
            }
        }
        let t = slideshow[i + 1]
        slideshow[i + 1] = slideshow[bestI]
        slideshow[bestI] = t
        // console.log( i )
    }
    console.timeEnd("Searching")
    console.log(score(slideshow))
    
    writeFile(slideshow, name + "lina.out")
}


function doStage(name){
    let photos = readFile(name)
    console.time("Searching")
    let slideshow = reorderSlideshow(naiveSlideshow(orderByNumberOfTags(photos)))
    console.timeEnd("Searching")
    let sc = score(slideshow)
    console.log(sc)
    writeFile(slideshow, name + ".out")
    return sc
}

lina("d_pet_pictures")
lina("e_shiny_selfies")

// let ts = 0
// console.time("Total time")
// ts += doStage("a_example")
// // ts += doStage("b_lovely_landscapes") // Tag pairs
// ts += doStage("c_memorable_moments")
// // ts += doStage("d_pet_pictures")
// ts += doStage("e_shiny_selfies")
// console.timeEnd("Total time")
// console.log(`Total interest score: ${ts}`)

