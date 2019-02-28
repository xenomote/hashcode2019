// photos :: [photo]
function score (photos) {

    let total = 0;

    for (let i = 0; i < photos.length - 1; i++) total += compare(photos[i], photos[i + 1])

    return total;

}

// a :: [tag]
// b :: [tag]
function compare (a, b) {

    let an = bn = abn = 0

    a.forEach(x => {
        if (b.includes(x)) abn++;
        else a++;
    });

    b.forEach(y => {
        if (!a.includes(y)) b++;
    });

    return min(an, bn, abn);

}
