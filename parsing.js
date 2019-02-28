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



let photos = readFile("a_example")
console.log(JSON.stringify(photos))
slide1 = {a:photos[0]}
slide2 = {a:photos[1], b:photos[2]}
slide3 = {a:photos[3]}

writeFile([slide1, slide2, slide3], "test.out")
