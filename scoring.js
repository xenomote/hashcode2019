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

    let atags = new Set([...a.a.tags, ...(a.b ? a.b.tags : [])]);
    let btags = new Set([...b.a.tags, ...(b.b ? b.b.tags : [])]);

    atags.forEach(x => {
        if (btags.has(x)) abn++;
        else an++;
    });

    btags.forEach(y => {
        if (!atags.has(y)) bn++;
    });

    return Math.min(an, bn, abn);
}

// slide :: slide
// returns [tag]
function tags (slide) {
    return Array.from(new Set([...slide.a.tags, ...(slide.b ? slide.b.tags : [])]));
}

module.exports = {score, compare};
