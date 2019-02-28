const fs = require('fs')

function readFile(name){
    let photos =  fs.readFileSync(name + ".txt", "utf-8").split('\n')
    console.log(photos)
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
