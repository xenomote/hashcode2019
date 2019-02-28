let scoring = require('scoring.js');

// slides :: [slide] !!!CLOBBERED!!!
// returns [slide]
function generate (slides) {

    let output = [];

    output.push(slides.pop());

    slides.forEach(slide => {
        let best = output;
        let best_score = 0;

        for (let i = 0; i < slides.length; i++) {

            let temp = output.splice(i, 0, slide);
            let temp_score = scoring.score(temp);

            if (score > best_score) {
                best = temp;
                best_score = temp_score
            }
        }

        output = best;
        
    });

    return output;
}