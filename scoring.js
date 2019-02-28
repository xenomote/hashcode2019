/// slides :: [slide]
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
    console.log(a)

    let an = bn = abn = 0

    let atags = tags(a);
    let btags = tags(b);
    console.log(atags, btags)

    atags.forEach(x => {
        if (btags.includes(x)) abn++;
        else an++;
    });

    btags.forEach(y => {
        if (!atags.includes(y)) bn++;
    });

    console.log(an, bn, abn)

    return Math.min(an, bn, abn);

}

// slide :: slide
// returns [tag]
function tags (slide) {
    return Array.from(new Set([...slide.a.tags, ...(slide.b ? slide.b.tags : [])]));
}

module.exports = {score, compare};
