// Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.

// How many such routes are there through a 20×20 grid?

// you can move right (R) or down (D), have to have 20 Rs and 20 Ds by the end
// so its a question of, how many different ways can I arrange 20 Rs and 20 Ds

// there are 40 moves so the nPr is 40 P 40
// there are 20 Rs so divide by 20!
// there are 20 Ds so divide by 20! again
// search term here is "permutations with repetition"


function factorial(n) {
    for (var i = n-1; i > 1; i--) {
        n *= i;
    }
    return n;
}


console.log( factorial(40) / (factorial(20)*factorial(20)) ); // 137846528820.00003

// javascript doing integer math in floating point is wild