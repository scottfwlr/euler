// Find the largest palindrome made from the product of two 3-digit numbers.

palindrome = function(str) {
    var pal = str.toString().split("").reverse().join("");
    return pal == str; 
};

var biggest = -1;
var result = [];

for (var i = 999; i >= 100; i--) {
    for (var j = 999; j >= 100; j--) {
        var n = i*j;
        if (palindrome(n) && n > biggest) {
            biggest = n;
            result = [i, j];
        }
    }
}

console.log('biggest: ' + biggest + ", digits: " + result);
// biggest: 906609, digits: 993,913