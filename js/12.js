// The sequence of triangle numbers is generated by adding the natural numbers.
// 28 is the first triangle number to have over five divisors.
// What is the value of the first triangle number to have over five hundred divisors? <<<--->>>

var triangles = [1, 3, 6, 10, 15, 21, 28];
triangles.iterate = function() {
    this.push( this[this.length-1] + this.length+1 );
};
// this is just much more efficient than `[1..n].sum`

function divisors(n) {
    var result = [];
    var brkpt = n;
    for (var i = 1; i <= brkpt; i++) {
        if (n % i == 0) {
            result.push(i);   // if we found one factor,
            result.push(n/i); // we have found another,
            brkpt = n/i - 1;  // and we know to stop early.
        }
    }
    return result;
}

var i = 7; // start at the eighth element
var result = 0;

while(true) {
    triangles.iterate();
    var divs = divisors(triangles[triangles.length-1]);
    if (divs.length > 500) {
        console.log( triangles[triangles.length-1] ); 
        return;
    }
    i++;
}

// 76576500

// time node 12.js
// 0.35s user 0.02s system 99% cpu 0.367 total