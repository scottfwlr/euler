// Find the sum of all the multiples of 3 or 5 below 1000. <<<--->>>

var total = 0;
for (var i = 1; i <= 999; i++) {
    if ((i % 3 == 0) || (i % 5 == 0)) {
        total = total + i;
    }
}
console.log(total); // 233168