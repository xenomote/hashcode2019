// slides :: [slide]
// returns int
function score (slides) {

    let total = 0;

    for (let i = 0; i < slides.length - 1; i++) total += compare(slides[i], slides[i + 1])

    return total;

}

// a :: slide 
// b :: slide
// returns int
function compare (a, b) {

    let an = bn = abn = 0

    let atags = tags(a);
    let btags = tags(b);

    atags.forEach(x => {
        if (btags.includes(x)) abn++;
        else a++;
    });

    btags.forEach(y => {
        if (!atags.includes(y)) b++;
    });

    return min(an, bn, abn);

}

// slide :: slide
// returns [tag]
function tags (slide) {

    let tags = [];

    if (slide.a) tags.concat(slide.a.tags);
    if (slide.b) tags.concat(slide.b.tags);

    return tags;

}
